import { useRouter } from "next/router";
import { FormLayout, FormContent, FormHeader } from "@/components/forms/FormLayout";
import { ShieldQuestion,SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Verification()
{

  const router = useRouter();

  let metamap: string | undefined; 

  if ( router.query.form === 'individual' && router.isReady ) metamap = router.query.metamap as string;

  return (

    <FormLayout className="ring bg-black">
      <div className='py-10 w-full'>
        <div className='w-full max-w-[44.75rem] mx-auto rounded-xl overflow-hidden border border-neutral-100 h-full flex flex-col'>
          <FormHeader>
          </FormHeader>
          <FormContent className="flex flex-col items-center h-full text-neutral-700 space-y-6">
            <ShieldQuestion className="h-24 w-24 aspect-square stroke-2" />
            <h1 className="heading5Bold">Identity Verification Required</h1>
            <p className="paragraph2Regular text-neutral-500 max-w-sm text-center">You are required to complete an identity verification to complete your KYC application.</p>
            {metamap && <Link href={metamap} target="_blank">
              <Button className="flex items-center">
                <span>Proceed</span>
                <SquareArrowOutUpRight className="ml-1 h-4 aspect-square"/>
              </Button>
            </Link>}
          </FormContent>
        </div>
      </div>
    </FormLayout>
  );
}