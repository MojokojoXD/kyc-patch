import { useRouter } from 'next/router';
import { FormLayout, FormContent, FormHeader } from '@/components/forms/FormLayout';
import { ShieldQuestion, SquareArrowOutUpRight, CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


export default function Verification()
{
  const router = useRouter();

  if ( !router.isReady ) return null;


  let metamap: string = '#';
  let verifiablePersons: { id: number; fullName: string; email: string; }[] = [];

  const isFormEmailVerified = router.query.form === 'corporate' || router.query.form === 'joint';

  if ( !isFormEmailVerified ) metamap = router.query.metamap as string;
  if ( isFormEmailVerified ) verifiablePersons = JSON.parse( router.query.addr as string );

  const headerIconClx = cn(
    'h-20 w-20 aspect-square stroke-2 mx-auto',
    isFormEmailVerified ? 'fill-success-500 stroke-white stroke-1' : 'stroke-neutral-500'
  );

  const HeaderIcon = () =>
    !isFormEmailVerified ? (
      <ShieldQuestion className={ headerIconClx } />
    ) : (
      <CircleCheck className={ headerIconClx } />
    );
  const title = isFormEmailVerified
    ? 'KYC Application Submitted'
    : 'Identity Verification Required';
  const blurb = isFormEmailVerified
    ? 'An email has been sent to the people listed below for a quick verification process to complete this KYC application'
    : 'You are required to complete an identity verification to complete your KYC application.';


  return (
    <FormLayout className='ring bg-black'>
      <div className='py-10 w-full'>
        <div className='w-full max-w-[44.75rem] mx-auto rounded-xl overflow-hidden border border-neutral-100 h-full flex flex-col'>
          <FormHeader></FormHeader>
          <FormContent className='flex flex-col items-center h-full text-neutral-700 space-y-6'>
            <div className='space-y-6'>
              <div className='grow-0'>
                <HeaderIcon />

              </div>
              <div className='space-y-2'>
                <h1 className='heading5Bold text-center'> { title }</h1>
                <p className='paragrappRegular text-neutral-500 max-w-sm text-center'>{ blurb } </p>
              </div>

              { !isFormEmailVerified ? (
                <div>
                  <a
                    href={ metamap }
                    target='_blank'
                    className='mx-auto block w-fit'
                  >
                    <Button className='flex items-center'>
                      <span>Proceed</span>
                      <SquareArrowOutUpRight className='ml-1 h-4 aspect-square' />
                    </Button>
                  </a>
                </div>
                
                  
              ) : (
                <div className='w-full'>
                  <div className='bg-neutral-50 p-6 border border-neutral-100 rounded-[0.2rem]'>
                    <ul className='space-y-4'>
                      { verifiablePersons.map( v =>
                      {
                        return (
                            <li key={ v.id }>
                              <p className='paragraph2Medium'>{ v.fullName } </p>
                              <p className='paragraph2Regular text-neutral-500'>{ v.email }</p>
                            </li>
                        );
                      } ) }
                    </ul>
                  </div>
                </div>
              ) }
            </div>
          </FormContent>
        </div>
      </div>
    </FormLayout>
  );
}
