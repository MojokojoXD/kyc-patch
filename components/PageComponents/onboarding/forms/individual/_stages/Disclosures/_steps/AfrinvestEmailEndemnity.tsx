// import { useFormContext } from 'react-hook-form';
import {
	AccordionItem,
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import {
	FormHeader,
	FormTitle,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
// import type { IndividualFormSchema } from '@/types/forms/individual';


export default function AfrinvestEmailEndemnity() {
	// const form = useFormContext<IndividualFormSchema>();

	const applicant = [ 1 ];

	return (
		<>
			<FormHeader>
				<FormTitle>Email Indemnity - Afrinvest</FormTitle>
			</FormHeader>
			<FormContent>
				<div className='text-base font-normal leading-relaxed px-6 py-10 bg-neutral-50 rounded-md border border-neutral-100 space-y-6 max-w-prose '>
					<p>
						In consideration of Afrinvest Securities Limited (the “Company)
						agreeing to accept and honour electronic mail instructions from
						me/us (or from such other third parties as I/we may from time to
						time direct to operate my account) to operate my stockbroking
						account with the Company, I hereby unconditionally and irrevocably
						indemnify the Company against all claims which may be made against
						it in consequence thereof and to pay to it on demand, all payments,
						losses, costs and expenses made, suffered or incurred by the Company
						in consequence thereof or arising therefrom.
					</p>{' '}
					<p>
						I also agree to pay the Company on demand, any further charges and
						interest which may arise in the event of any claim being made
						against it under this arrangement.
					</p>
					<p>
						Furthermore, I <strong>UNCONDITIONALLY</strong> undertake to bear
						all responsibilities which may arise as a result of any payment made
						to or by the Company in furtherance of the above and to be directly
						answerable to any investigation by any statutory body or agency
						bordering on this request or any other charge that may be made in
						respect thereof.
					</p>
				</div>
				<div className='space-y-10 py-10'>
					{applicant.map((c, i) => (
						<Accordion
							key={c}
							type='single'
							defaultValue='item-1'
							collapsible>
							<AccordionItem value={`item-${i}`}>
								<AccordionTrigger>
									{/* Applicant #{c.id}: {c.firstName} {c.lastName} */}
								</AccordionTrigger>
								<AccordionContent
									className='data-[state=closed]:hidden'
									forceMount>
									<AfrinvestEndemnityForm  />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</FormContent>
		</>
	);
}


function AfrinvestEndemnityForm() {

	return (
		<></>
	);
}
