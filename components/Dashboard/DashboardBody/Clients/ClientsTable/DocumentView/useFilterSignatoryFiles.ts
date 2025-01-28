import md5 from 'md5';
import type { ClientVerifications } from '../../clients';


export interface SignatoryFiles
{
  upload_type: string;
  file_name: string;
}

interface VerifiedSignatory extends ClientVerifications
{
  clientID: string;
}

export function useFilterSignatoryFiles(
  verifiedSignatory: VerifiedSignatory | null,
  files: SignatoryFiles[] = []
): SignatoryFiles[]
{

  if ( !verifiedSignatory ) return [];

  const { signatory_name, signatory_email } = verifiedSignatory;

  const [ firstName, lastName ] = signatory_name.split( ' ' );

  const fileCredentialsEncoding = JSON.stringify([ firstName,lastName, signatory_email, verifiedSignatory.clientID ]);
  
  const credentialsHash = md5( fileCredentialsEncoding );

  return files.filter( f => f.file_name.includes( credentialsHash ) )
}
