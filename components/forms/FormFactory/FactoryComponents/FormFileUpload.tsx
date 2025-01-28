import { useState } from 'react';
import type { FactoryComponentProps } from '@/types/Components/formFactory';
import { Controller } from 'react-hook-form';
import
  {
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
  } from '../../../ui/form';
import { FileUploader } from '@/components/ui/CompoundUI/FileUploader';
import { FileHelpers } from '@/utils/clientActions/fileHelpers';
import { cn } from '@/lib/utils';
import { useKYCFormContext } from '../../utils/formController';

interface FormFileUploadProps extends FactoryComponentProps<'file-upload'> { }

export default function FormFileUpload( {
  name,
  label,
  defaultValue = '',
  rules,
  componentProps = { fileFieldName: 'default_file_name' },
}: FormFileUploadProps )
{

  const { fileNameEncoding, fileFieldName } = componentProps;

  if ( !fileNameEncoding || !fileFieldName ) throw new Error( 'Form file upload component is missing file credentials configuration' );

  const {
    form,
    formVars: { clientID },
  } = useKYCFormContext();
  const { control, getValues, setError, resetField, setValue } = form;
  const [ isLoading, setIsLoading ] = useState( false );

  const currentCloudURL = getValues( name ) || '';
  const { filename, objectURL } = ( getValues( `_formMetadata.` + name ) as {
    filename: string;
    objectURL: string;
  } ) || {
    filename: '',
    objectURL: '',
  };

  return (
    <Controller
      control={ control }
      name={ name }
      defaultValue={ defaultValue }
      rules={ !rules ? {} : rules }
      render={ ( { field, fieldState } ) => (
        <FormItem>
          <FormLabel
            className={ cn(
              componentProps.classNames?.labelStyles,
              fieldState.error ? 'text-error-500' : undefined
            ) }>
            { label }
          </FormLabel>
          <FormControl>
            <FileUploader
              id={ field.name }
              ref={ field.ref }
              previewURL={ objectURL }
              isLoading={ isLoading }
              fileName={ filename }
              onUploadError={ ( e ) => setError( name, { type: 'upload-error', message: e } ) }
              onFileUpload={ async ( file ) =>
              {
                if ( currentCloudURL )
                {
                  resetField( name, { defaultValue: '', keepError: true } );
                  setValue( '_formMetadata.' + field.name + '.filename', '' );
                  setValue( '_formMetadata.' + field.name + '.objectURL', '' );
                }

                if ( !file ) return;

                setIsLoading( true );

                const securityFields = getValues( fileNameEncoding );

                //File security encoding must be a serialized tuple of [ firstName, middleName, lastName, dateOfBirth, clientID ]

                const securityEncoding = JSON.stringify( [ ...securityFields, clientID ] );

                const result = await FileHelpers.uploadFileAndDownload( file, {
                  fileName: fileFieldName,
                  credentials: securityEncoding
                } );

                setIsLoading( false );

                if ( result )
                {
                  field.onChange( result.cloudURL );
                  setValue( '_formMetadata.' + field.name, {
                    filename: file.name,
                    objectURL: result.previewURL,
                  } );

                  return;
                }

                setError( field.name, {
                  type: 'upload-error',
                  message: 'Something went wrong!, Please try again later.',
                } );
              } }
            />
          </FormControl>
          <FormMessage position={ componentProps.classNames?.errorPosition }>
            { fieldState.error?.message }
          </FormMessage>
        </FormItem>
      ) }
    />
  );
}
