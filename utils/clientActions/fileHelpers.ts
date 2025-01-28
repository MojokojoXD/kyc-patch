import { BASE_URL } from '../vars/uri'
import { formatISO } from 'date-fns';
import { FormHelpers } from './formHelpers';
import axios from 'axios';
import md5 from 'md5'

interface UploadServerResponse {
  url: string;
}

// const SIGNATURE_UPLOAD_URL = '/api/onboarding/uploads';
const SIGNATURE_UPLOAD_URL = BASE_URL + '/upload';
// const SIGNATURE_DOWNLOAD_URL = BASE_URL + '/download';

export class FileHelpers {
  static upload = async (file: File) => {
    if (!File) return;

    const payload = new FormData();

    payload.append('file', file);
    payload.append('fileName', file.name);

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

  private static download = async (fileName: string): Promise<string | undefined> => {
    if (!fileName) return;

    const image = await FormHelpers.statelessRequest<Record<string, never>, Blob>(
      '/api/onboarding/download?file=' + fileName,
      {
        responseType: 'blob',
      }
    );
    const blob = new Blob([image]);

    return URL.createObjectURL(blob);
  };

  static uploadFileAndDownload = async (
    file: File | null,
    config: {
      fileName: string;
      credentials: string;
    }
  ) => {
    if (!file) return;

    try {
      const formData = {
        file: file,
      };

      config.credentials = md5( config.credentials );

      const urlQuery = new URLSearchParams( config );

      urlQuery.append( 'timestamp', formatISO( new Date() ) );

      const cloudRes = await FormHelpers.statelessRequest<typeof formData, { url: string }>(
        `/api/onboarding/uploads?${urlQuery.toString()}`,
        {
          data: formData,
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

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

  static fileToURL = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = () => reject(fileReader.error);

      fileReader.readAsDataURL(file);
    });

  private hash = function (str: string) {
    let hash = 0;
    let charCode: number | undefined = undefined;

    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      charCode = str.charCodeAt(i);
      hash = (hash << 5) - hash + charCode;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };
}
