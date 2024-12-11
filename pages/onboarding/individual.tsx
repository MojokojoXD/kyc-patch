import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import type { IndividualFormSchema } from '@/types/forms/individualSchema';
import type { FormComponentDict } from '@/components/forms/utils/formReducer';
import { Form } from '@/components/ui/form';
import * as Stages from '@/components/forms/__KYC__/individual/stages/stagesDictionary';
import {
	FormLayout,
	FormNav,
	FormNavButtons,
} from '@/components/forms/FormLayout';
import { useCloseTabWarning } from '@/components/forms/utils/customHooks/useCloseTabWarning';
import {
	individualFormMetadata,
	type IndividualFormStage,
} from '@/components/forms/__KYC__/individual/config/individualFormMetadata';
import {
	useKYCForm,
	KYCContext,
} from '@/components/forms/utils/formController';
import Loading from '@/components/ui/Loading';
import axios from 'axios';

export default function IndividualForm() {
	const form = useForm<IndividualFormSchema>({
		mode: 'onChange',
	});

  const router = useRouter();
	const KYCForm = useKYCForm(individualFormMetadata, form);

	const {
		form: {
			formState: { isDirty },
			handleSubmit,
		},
		formVars: { clientID, submissionID },
		formNav: { currentStage },
		formAction,
		error,
    isLoading,
    toggleLoading,
    setError,
	} = KYCForm;

	useCloseTabWarning(isDirty);

	const individualStagesDict: FormComponentDict<IndividualFormStage> = {
		introduction: <Stages.FormsIntro />,
		personal: <Stages.PersonalInfoStage />,
		'next of kin': <Stages.NextOfKinStage />,
		disclosures: <Stages.DisclosuresStage$Individual />,
		'document checklist': <Stages.DocumentChecklistStage$Individual />,
	};

	const clientType = form.watch('clientType');

	useEffect(() => {
		if (clientType === 'Individual') {
			formAction({
				type: 'remove_step',
				stage: 'disclosures',
				step: 'signature mandate',
			});
		} else
			formAction({
				type: 'reset',
				stages: individualFormMetadata,
			});
	}, [clientType, formAction]);

  const submitHandler: SubmitHandler<IndividualFormSchema> = async ( data ) =>
  {

		const payload = {
			clientID,
			submissionID,
			data: {...data},
    };

    
    toggleLoading( true );
		try {
      const res = await axios.post < { Status: 'SUCC' | 'FAIL', link: string }>('/api/forms', payload);

      if ( res.status === 200 && res.data.Status === 'SUCC' )
      {
        router.replace( `/onboarding/verification?form=individual&metamap=${ res.data.link }` );
      }
      

		} catch (error) {
      console.log( error );
      setError( 'Form submission failed. Please contact system admin!' )
        
    } finally
    {
      toggleLoading( false );
    }
	};

	if (error) {
		console.error(error);
		return (
			<p className='p-10'>Something went wrong! Please contact system admin</p>
		);
  }

  return (
    <>
      <Head>
        <title>SecondSTAX KYC - Individual or Joint</title>
      </Head>
      {/* @ts-expect-error will fix mismatch later */}
      <KYCContext.Provider value={KYCForm}>
        <FormLayout>
          <FormNav />
          <Loading reveal={isLoading} />
          <div className='relative w-full bg-neutral-50 flex justify-center overflow-auto h-full py-10'>
            <Form {...KYCForm.form}>
              <form
                onSubmit={handleSubmit(submitHandler)}
                className='w-full max-w-[44.75rem] flex border border-neutral-100  bg-white'>
                <div className='w-full h-full flex flex-col rounded-xl'>
                  {individualStagesDict[currentStage]}
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
