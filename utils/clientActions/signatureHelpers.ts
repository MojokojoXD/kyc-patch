import { BASE_URL } from '../vars/uri';
import axios from 'axios';

interface UploadServerResponse {
	url: string;
}

const SIGNATURE_UPLOAD_URL = BASE_URL + '/upload';
const SIGNATURE_DOWNLOAD_URL = BASE_URL + '/download';

export class SignatureProcessor {
	private static modifyFileName = (
		signatureFile: File,
		clientId: string,
		id: number = 0
	) => {
		const fileExtension = signatureFile.name.split('.').pop();
		const newFileName = `signature${id}_${clientId}_${new Date().getTime()}.${fileExtension}`;

		return new File([signatureFile], newFileName, { type: signatureFile.type });
	};

	static upload = async (file: File, clientId: string) => {
		if (!File || !clientId) return;

		const renamedFile = this.modifyFileName(file, clientId);

		const payload = new FormData();

		payload.append('file', renamedFile);
		payload.append('fileName', renamedFile.name);

		try {
			const res = await axios<UploadServerResponse>(SIGNATURE_UPLOAD_URL, {
				data: payload,
				method: 'POST',
				withCredentials: true,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			if (res.status === 200) {
				return res.data.url;
			}

			return;
		} catch (error) {
			console.log(error);
		}
	};

	static download = async (signatureURL: string) => {
		if (!signatureURL ) return;

		const signatureStorageURL = new URL(signatureURL);

		const signatureFileName = signatureStorageURL.pathname.split('/').pop();

		try {
			const downloadProcessorRes = await axios<Blob>(SIGNATURE_DOWNLOAD_URL, {
				method: 'POST',
				data: {
					fileName: signatureFileName,
				},
				responseType: 'blob',
				withCredentials: true,
			});

			if (!downloadProcessorRes.data) return;

			const signatureURL = URL.createObjectURL(downloadProcessorRes.data);

			return signatureURL;
		} catch (error) {
			console.log(error);
		}
	};
}
