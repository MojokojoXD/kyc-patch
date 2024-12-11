import { BASE_URL } from '../vars/uri';
import { FormHelpers } from './formHelpers';
import axios from 'axios';
import type { ClientID } from '@/types/forms/broker';

interface UploadServerResponse {
	url: string;
}

// const SIGNATURE_UPLOAD_URL = '/api/onboarding/uploads';
const SIGNATURE_UPLOAD_URL = BASE_URL + '/upload';
// const SIGNATURE_DOWNLOAD_URL = BASE_URL + '/download';

export class FileHelpers {
	static modifyFileName = (
		file: File,
		clientId: ClientID,
		options: Partial<{
			id: number;
			fileType: 'signature' | 'file';
			fieldName: string | undefined;
		}> = {
			id: 0,
			fileType: 'signature',
		}
	) => {
		const fileExtension = file.name.split('.').pop();

		const namePrepend =
			options.fileType === 'file' ? options.fieldName : `signature${options.id}`;

		const newFileName = `${namePrepend}_${clientId}_${new Date().getTime()}.${fileExtension}`;

		return new File([file], newFileName, {
			type: file.type,
		});
	};

	static upload = async (file: File) => {
		if (!File) return;

		const payload = new FormData();

		payload.append('file', file);
		payload.append('fileName', file.name);

		try {
			const res = await axios<UploadServerResponse>(
				SIGNATURE_UPLOAD_URL,
				{
					data: payload,
					method: 'POST',
					withCredentials: true,
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			if (res.status === 200) {
				return res.data.url;
			}

			console.log(res);

			return;
		} catch (error) {
			console.log(error);
		}
	};

	private static download = async (
		fileName: string
	): Promise<string | undefined> => {
		if (!fileName) return;

		const image = await FormHelpers.statelessRequest<
			Record<string, never>,
			Blob
		>('/api/onboarding/download?file=' + fileName, {
			responseType: 'blob',
		});
		const blob = new Blob([image]);

		return URL.createObjectURL(blob);
	};

	static uploadFileAndDownload = async (file: File | null) => {
		if (!file) return;

		try {
			const formData = {
				file: file,
			};

			const cloudRes = await FormHelpers.statelessRequest<
				typeof formData,
				{ url: string }
			>('/api/onboarding/uploads', {
				data: formData,
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			if (!cloudRes) {
				return;
      }
			const imageURL = await this.download(cloudRes.url);

			if (!imageURL) {
				return;
			}

			return {
				cloudURL: cloudRes.url,
				previewURL: imageURL,
			};
		} catch (error) {
			console.log(error);
		}
	};

	static fileToURL = (
		file: File
	): Promise<string | ArrayBuffer | null> =>
		new Promise((resolve, reject) => {
			const fileReader = new FileReader();

			fileReader.onload = () => resolve(fileReader.result);
			fileReader.onerror = () => reject(fileReader.error);

			fileReader.readAsDataURL(file);
		});
}
