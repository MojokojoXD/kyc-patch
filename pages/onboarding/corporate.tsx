import Head from 'next/head';
import { SubmitHandler } from 'react-hook-form';
import
  {
    corporateStages,
    CorporateStageDict,
  } from '@/components/forms/__KYC__/corporate/config/corporateFormConfigs';
import { Form } from '@/components/ui/form';
import
  {
    FormLayout,
    FormNav,
    FormNavButtons,
  } from '@/components/forms/FormLayout';
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';
import * as Stages from '@/components/forms/__KYC__/corporate/stages/stagesComponents';
import { useCloseTabWarning } from '@/components/forms/utils/customHooks/useCloseTabWarning';
import
  {
    KYCContext,
    useKYCForm,
  } from '@/components/forms/utils/formController';
import Loading from '@/components/ui/Loading';
import axios from 'axios';
import { useRouter } from 'next/router';


export default function CorporateForm()
{

  const KYCForm = useKYCForm<CorporateFormSchema, typeof corporateStages>( corporateStages);

  const {
    form,
    formNav: { currentStage },
    formVars: { clientID, submissionID },
    isLoading,
    error,
    toggleLoading,
    setError
  } = KYCForm;

  const {
    formState: { isDirty },
    handleSubmit,
  } = form;

  useCloseTabWarning( isDirty );
  const router = useRouter()

  const corporateStagesDict: CorporateStageDict = {
    introduction: <Stages.FormsIntro />,
    business: <Stages.BusinessStage />,
    contacts: <Stages.ContactsStage />,
    'account signatories': <Stages.AccountSignatoriesStage />,
    'settlement account': <Stages.SettlementAccountStage$Corporate />,
    disclosures: <Stages.DisclosuresStage$Corporate />,
    'document checklist': <Stages.DocumentCheckListStage$Corporate />,
  };

  const submitHandler: SubmitHandler<CorporateFormSchema> = async ( data ) =>
  {
    const payload = {
      clientID,
      submissionID,
      data: {
        ...data,
      },
    };

    try
    {
      toggleLoading( true )

      const res = await axios.post( '/api/forms?form=corporate', payload );

      if ( res.status === 200 )
      {
        const verifiablePersons = data.accountSignatories.signatories.map( ( s, i ) => ( {
          id: i,
          fullName: `${ s.firstName } ${ s.middleName || '' } ${ s.lastName }`,
          email: s.address.email
        } ) );

        const serializedPersons = JSON.stringify( verifiablePersons );

        router.replace( `/verification?form=corporate&addr=${serializedPersons}`,'/verification' )
      }
      
    } catch (error) {
      console.log( error );

      setError( 'Something went wrong! Please contact support' );

    } finally
    {
      toggleLoading( false );
    }
  };

  if ( error )
  {
    console.error( error );

    return (
      <p className='p-10'>
        Link or session expired! Please contact broker for a new link{ ' ' }
      </p>
    );
  }

  return (
    <>
      <Head>
        <title>SecondSTAX KYC - Corporate</title>
      </Head>
      <KYCContext.Provider value={ KYCForm }>
        <FormLayout>
          <FormNav />
          <Loading reveal={ isLoading } />
          <div className='relative w-full bg-neutral-50 flex justify-center overflow-auto h-full py-10'>
            <Form { ...KYCForm.form }>
              <form
                onSubmit={ handleSubmit( submitHandler ) }
                className='w-full max-w-[44.75rem] flex '>
                <div className='w-full h-full flex flex-col rounded-xl'>
                  { corporateStagesDict[ currentStage ] }
                  <FormNavButtons />
                </div>
              </form>
            </Form>
          </div>
        </FormLayout>
      </KYCContext.Provider>
    </>
  );
}
