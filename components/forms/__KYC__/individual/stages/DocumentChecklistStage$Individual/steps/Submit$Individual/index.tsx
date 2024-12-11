import type { FormStep } from '@/types/Components/onboarding';
import { FormContent, FormHeader, FormTitle, FormSubHeader } from '@/components/forms/FormLayout';
import { Button } from '@/components/ui/button';
import { useKYCFormContext } from '@/components/forms/utils/formController';

export const Submit$Individual: FormStep = () =>
{
  const { prev } = useKYCFormContext();

  return (
    <>
      <FormHeader>
        <FormTitle className='heading5Bold'>Almost Done!</FormTitle>
        <FormSubHeader>Thanks for completing your application. Submit and verify your identity.</FormSubHeader>
      </FormHeader>
      <FormContent className='relative'>
        <div className='absolute bottom-10 w-full inset-x-0 flex items-center justify-end px-10 space-x-2 py-5 grow-0'>
          <Button type='submit' size={ 'lg' } onClick={ prev } variant={ 'outline' }>Go Back</Button>
          <Button type='submit' size={ 'lg' }>Submit</Button>
        </div>
      </FormContent>
    </>
  );
};
