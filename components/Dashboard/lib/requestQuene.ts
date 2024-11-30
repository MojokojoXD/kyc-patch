import type { Method } from 'axios';
import { protectedAxiosInstance } from '../lib/http/axios';
import { AxiosError } from 'axios';

export interface JobFeedback {
	job: Job;
	feedback: Feedback;
}

export interface Job {
	url: string;
	method: Method;

	data?: object;
}

export enum RequestStatus {
	PENDING = 'PENDING',
	PROCESSING = 'PROCESSING',
	COMPLETED = 'COMPLETED',
	FAILED = 'FAILED',
}
export interface Feedback<T = never> {
	(
		res: T | null,
		error: string | null,
		requestStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
	): void;
}

export interface JobFeedbackFn<T = never> {
	(job: Job, result: Feedback<T>): void;
}
interface Queueable {
	enqueue: (...request: { job: Job; feedback: Feedback }[]) => void;
	dequeue: () => void;

	process: () => void;
}

export class RequestQueue implements Queueable {
	private jobsQueue: JobFeedback[] = [];

	constructor() {
		if (typeof window === 'undefined')
			throw new Error('RequestQueue can only be instantiated client side');
	}
	enqueue(...requests: typeof this.jobsQueue) {
		this.jobsQueue.push(...requests);
	}

	dequeue() {
		this.jobsQueue.shift();
	}

	private async request(job: Job, feedback: Feedback) {
		feedback(null, null, RequestStatus.PROCESSING);

		const { url, method, data } = job;

		try {
			const res = await protectedAxiosInstance.request({
				url,
				method,
				...(data && { data }),
			});

			if (res.status === 200 || res.status === 304) {
				feedback(res.data, null, RequestStatus.COMPLETED);
				return;
			}

			const newTokenResponse = await protectedAxiosInstance.get(
				'api/dashboard/refresh-token',
				{
					baseURL: '',
				}
			);

			if (newTokenResponse.status !== 200) {
				feedback(null, 'Unable to refresh access token', RequestStatus.FAILED);
				return true;
			}

			const retryRes = await protectedAxiosInstance.request({
				url: job.url,
				method: job.method,
				data: job.data,
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (retryRes.status === 200) {
				feedback(retryRes.data, null, RequestStatus.COMPLETED);
				return;
			}

			feedback(
				null,
				`unable to complete request for request url: ${job.url}`,
				RequestStatus.FAILED
			);

			return true;
		} catch (error) {
			if (error instanceof AxiosError) {
				feedback(null, error.message, RequestStatus.FAILED);
			}

			console.log(error);
		}
	}

	async process() {
		while (this.jobsQueue.length > 0) {
			const didTokenRefreshFail = await this.request(
				this.jobsQueue[0].job,
				this.jobsQueue[0].feedback
			);

			if (didTokenRefreshFail) break;
			this.dequeue();
		}
	}
}
