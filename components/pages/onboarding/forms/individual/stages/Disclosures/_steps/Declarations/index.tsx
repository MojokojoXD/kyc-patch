import {
	FormHeader,
	FormTitle,
	FormSubHeader,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import type { FormStep } from '@/types/Components/onboarding';
import FormFactory from '@/components/UIcomponents/FormFactory';
import { declarationsFields } from './formBuilder/declarationsFields';

export const Declarations: FormStep = () => {
	return (
		<>
			<FormHeader>
				<FormTitle>Declaration</FormTitle>
				<FormSubHeader>
					Please read and consent to the declaration below.
				</FormSubHeader>
			</FormHeader>
			<FormContent>
				<div className='space-y-8 paragraph2Regular text-neutral-700'>
					<div className='space-y-5'>
						<h2>DataBank</h2>
						<div className='px-6 py-10 bg-neutral-50 rounded-md border border-neutral-100 space-y-8 h-3/4 max-w-prose [&>p]:indent-4'>
							<p>
								I/We, hereby declare that all the information submitted by
								me/us in this form is correct, true and valid, that by my/our
								request, to open and maintain securities account(s) in my/our
								name and undertake to notify (company name) of any changes to
								my/our particulars or information as may be necessary. I/We
								understand that upon the death of an account holder, all funds
								remaining in a joint account shall automatically pass to /
								become the sole property of the surviving owner.
							</p>{' '}
							<p>
								I/We also declare that we have read thoroughly and understood
								the contents of this application and have given my/our consent
								by virtue of my/our signature(s) on this form. I/We consent
								that investment decisions are my/our prerogative without sole
								reliance on the investment advice received from Databank.
								Databank accepts no liability for any direct or consequential
								loss arising from my/our decision.{' '}
							</p>
							<p>
								I/We also declare that all debits incurred on my/our
								securities account(s) by virtue of my/our trade orders shall
								be settled by me/ us accordingly. Any deposit given to a third
								party or a Databank staff member on my behalf is done at my
								own risk. Databank will not be held liable if the money does
								not reflect in your account.
							</p>
						</div>
					</div>
					<div className='space-y-5'>
						<h2>Kestrel</h2>
						<div className='px-6 py-10 bg-neutral-50 rounded-md border border-neutral-100 space-y-6 h-3/4 max-w-prose [&>p]:indent-4'>
							<p>
								I/We, Confirm that the information provided herein and the
								disclosures made are true and correct and undertake to inform
								you of any changes, immediately and not later than 30 calendar
								days. In case any of the above information is found to be
								false or untrue or misleading or misrepresenting, I/We are
								aware that I/We may be held liable for it.
							</p>{' '}
							<p>
								I/We hereby declare that I/We are not making this application
								for the purpose of contravention of any Act, Rules,
								Regulations or any statute of legislation or any
								notifications/directions issued by any governmental or
								statutory authority from time to time.
							</p>{' '}
							<p>
								Consent to receiving information from Kestrel Capital through
								SMS and or Email on the above registered number and email
								address. Confirm that I/We have read and understood this KYC
								Form as well as the enclosed Terms and Conditions and that
								these documents will govern your relationship with Kestrel
								Capital (East Africa) Limited. Confirm that I/We having
								understood that my/our personal information provided in this
								application form shall be processed in accordance with the
								provisions of the Kenya Data Protection Act 2019 and all other
								applicable laws as may be amended from time to time.
							</p>
						</div>
					</div>
					<div className='px-6 py-10 bg-neutral-50 rounded-md border border-neutral-100 space-y-3 h-3/4  max-w-prose'>
						<p>I/We hereby:</p>{' '}
						<ol className='list-[lower-roman] px-10 space-y-5'>
							<li>
								Request to open and maintain a Securities Account in my/our
								name/ Change particulars in my/our Securities Accounts as
								indicated above (delete as appropriate).
							</li>{' '}
							<li> Affirm that all information in this form is correct.</li>{' '}
							<li>
								Undertake to notify my CDA any change of particulars or
								information provided by me/us in this form.
							</li>
						</ol>
					</div>
				</div>
				<div>
					{declarationsFields.map((f) => (
						<FormFactory
							key={f.name}
							{...f}
						/>
					))}
				</div>
			</FormContent>
		</>
	);
};
