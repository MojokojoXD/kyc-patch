import { BASE_URL } from '../vars/uri';
import axios from 'axios';

interface UploadServerResponse {
	url: string;
}

// const SIGNATURE_UPLOAD_URL = '/api/onboarding/uploads';
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

        const renamedFile = this.modifyFileName( file, clientId );
        
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
            

            console.log(res)

			return;
		} catch (error) {
			console.log(error);
		}
	};

	static download = async (signatureURL: string):Promise<Blob | undefined> => {
		if (!signatureURL ) return;

		const signatureStorageURL = new URL(signatureURL);

		const signatureFileName = signatureStorageURL.pathname.split('/').pop();

		try {
			const downloadProcessorRes = await axios(SIGNATURE_DOWNLOAD_URL, {
				method: 'POST',
				data: {
					fileName: signatureFileName,
                },
                withCredentials: true,
                responseType: 'blob',
            } );
            
			if (!downloadProcessorRes.data) return;
            // const signatureURL = new Buffer( downloadProcessorRes.data ).toString( 'base64' );
			return downloadProcessorRes.data;
		} catch (error) {
            console.log( error );
            return;
		}
    };
    
    static fileToURL = ( file: File ):Promise<string | ArrayBuffer | null> => 
        new Promise( ( resolve, reject ) =>
        {
            const fileReader = new FileReader();


            fileReader.onload = () => resolve( fileReader.result ) ;
            fileReader.onerror = () => reject( fileReader.error );

            fileReader.readAsDataURL( file  )
        } )
}
