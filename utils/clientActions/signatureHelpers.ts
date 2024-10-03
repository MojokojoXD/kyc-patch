import { BASE_URL } from '../vars/uri';
import { FormHelpers } from './formHelpers';
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

	static download = async (fileName: string):Promise<string | undefined> => {
        if ( !fileName ) return;

		const image = await FormHelpers.statelessRequest<{}, Blob>(
            '/api/onboarding/download?file=' + fileName,
            {
                responseType: 'blob',
            }
        );
        const blob = new Blob([image]);

        return URL.createObjectURL(blob);
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
