import { useFormContext } from 'react-hook-form';
import {
	FormItem,
	FormControl,
	FormMessage,
	FormField,
} from '@/components/UIcomponents/ui/form';
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
import type { IndividualFormSchema } from '@/types/forms/individual';
import { useMemo, useState, useEffect, useContext } from 'react';
import type { SingleCategoryForm } from '../../NextOfKin/_steps/NextOfKin_Bio';
import { format } from 'date-fns';
import SignatureUploader from '@/components/UIcomponents/CompoundUI/SignatureUploader';
import { SignatureProcessor } from '@/utils/clientActions/signatureHelpers';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import { UserContext } from '@/Contexts/UserProfileProvider';

export default function KestrelNominee() {
	const form = useFormContext<IndividualFormSchema>();
	const { watch } = form;

	const applicant = useMemo(() => watch('applicant'), [watch]);

    const appWideData = useContext( UserContext );

    const onboardingFacts = appWideData?.onboardingFacts;

    if ( !onboardingFacts )
    {
        return <p className='p-10'>Something went wrong! Please try again later</p>
    }

	return (
		<>
			<FormHeader>
				<FormTitle>
					Nominee Agreement - Kestrel Capital Nominees Services LTD
				</FormTitle>
			</FormHeader>
			<FormContent>
				<div className='space-y-10 py-5'>
					{applicant.map((c, i) => (
						<Accordion
							key={c.id}
							type='single'
							defaultValue='item-1'
							collapsible>
							<AccordionItem value={`item-${c.id}`}>
								<AccordionTrigger>
									Applicant #{c.id}: {c.firstName} {c.lastName}
								</AccordionTrigger>
								<AccordionContent
									className='data-[state=closed]:hidden'
									forceMount>
									<KestrelNomineeForm
										applicantId={i}
										clientID={ onboardingFacts.clientID }
									/>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</FormContent>
		</>
	);
}

type KestrelNomineeFormProps = Pick<SingleCategoryForm, 'applicantId'> & {
	clientID: string;
};

function KestrelNomineeForm({
	applicantId,
	clientID,
}: KestrelNomineeFormProps) {
	const { getValues, setValue, control } =
		useFormContext<IndividualFormSchema>();
	const [signatureStatus, setSignatureStatus] = useState({
		processing: false,
		error: false,
	});
	const [previewURL, setPreviewURL] = useState<string>('');

	const { kestrelSignatureFileName } = getValues(
		`_formMetadata.applicant.${applicantId}`
	);

	const {
		firstName,
		middleName,
		lastName,
		countryOfResidence,
		proofOfIdentity: { idNumber },
		contacts: { residentialAddress, city },
		disclosures: {
			kestrel: {
				nomineeAgreement: { signatureURL },
			},
		},
	} = getValues(`applicant.${applicantId}`);

	const today = format(new Date(), 'M/d/yyyy');
	const fieldName =
        `applicant.${ applicantId }.disclosures.kestrel.nomineeAgreement.signatureURL` as const;
    
    

	useEffect(() => {
		const downloadImg = async (fileName: string) => {
			if (!fileName) return;
			const img = await SignatureProcessor.download(fileName);

			if (img) {
				setPreviewURL(img);
				setSignatureStatus({ error: false, processing: false });
				return;
			}
			setSignatureStatus({ processing: false, error: true });
		};

		if (signatureURL !== '') {
			setSignatureStatus((status) => ({ ...status, processing: true }));
			downloadImg(signatureURL);
		}
	}, [signatureURL]);

	if (signatureStatus.error) {
		return <p>Something went wrong! Please try again later.</p>;
	}

	return (
		<div>
			<div className='space-y-10'>
				<div className='text-base font-normal leading-relaxed px-6 py-10 bg-neutral-50 rounded-md border border-neutral-100 space-y-5 max-w-prose [&>ol]:space-y-5 [&>ul]:space-y-5 [&>ol]:ml-5 [&>ul]:ml-5 [&>h2+p]:mx-5 max-h-[28rem] overflow-auto'>
					<p>
						This AGREEMENT is made on <strong>{today}</strong> between:
					</p>
					<ol className='list-decimal'>
						<li>
							KESTREL CAPITAL NOMINEES SERVICES LIMITED, a company incorporated
							in the Republic of Kenya of Post Office Box Number 40005 -00100
							Nairobi, Kenya (hereinafter called “the Nominee”); and
						</li>
						<div className='flex'>
							<li></li>
							<p>
								<strong>
									Full Name: {firstName} {middleName} {lastName}
								</strong>
								<br />
								<strong>ID Number: {idNumber}</strong> <br />
								<strong>
									Address: {residentialAddress}{' '}
									{residentialAddress && city && ','} {city}{' '}
									{countryOfResidence}
								</strong>
								<br />
							</p>
						</div>
					</ol>
					<p>WHEREAS</p>
					<ul>
						<li>
							The Client is desirous of appointing the Nominee, a wholly owned
							subsidiary of Kestrel Capital (East Africa) Limited, to hold and
							to administer certain Securities (hereinafter defined) on behalf
							of the Client; and
						</li>
						<li>
							The Nominee is willing to accept such appointment subject to the
							terms and conditions set forth in this Agreement.
						</li>
					</ul>
					<p>IT IS HEREBY AGREED:</p>
					<h2>Interpretation</h2>
					<ul>
						<li>
							In this Agreement, unless the context otherwise requires, the
							following words and expressions shall have the following meanings:
						</li>
					</ul>
					<h2>Act:</h2>
					<ul>
						<li>means the Capital Markets Act (Chapter 485A);</li>
					</ul>
					<h2>Affiliate:</h2>
					<ul>
						<li>
							means with respect to a person, any other person directly or
							indirectly controlling, controlled by, or under common control
							with that person. For purposes of this definition, the term
							“control” means the possession, directly or indirectly, of the
							power to direct or cause the direction of the management and
							policies (including financial policies) of a person, whether
							through the ownership of voting securities, by contract or
							otherwise (including, with correlative meanings, the terms
							&quot;controlling&quot;, &quot;controlled by&quot; and &quot;under
							common control with&quot;);
						</li>
					</ul>
					<h2>Agreement:</h2>
					<p>means this agreement and any schedules or annexes hereto;</p>
					<h2>Authorized Person:</h2>
					<p>
						means a person authorized to act on behalf of the Client in
						accordance with this Agreement and includes, at the Nominee&apos;s
						discretion, any person the Client informs the Nominee is or that the
						Client holds out to be authorized to give instructions for the
						Client;
					</p>
					<h2>Business Day:</h2>
					<p>
						means any day which is not a Saturday or Sunday or public holiday in
						the Republic of Kenya;
					</p>
					<h2>Client Account Opening Form:</h2>
					<p>
						means the application form prepared by or on behalf of the Client
						and submitted to the Nominee or its Affiliates in respect of this
						Agreement;
					</p>
					<h2>Government:</h2>
					<p>
						means any government, government related agency or government
						controlled persons including regulators, central banks and public
						authorities;
					</p>
					<h2>Kestrel:</h2>
					<p>
						means Kestrel Capital (East Africa) Limited and any of its
						Affiliates;
					</p>
					<h2>Kestrel Terms and Conditions:</h2>
					<p>
						means the Kestrel Capital (East Africa) Limited&apos;s Terms and
						Conditions as may be amended from time to time.
					</p>
					<h2>Market Regulations:</h2>
					<p>
						means all Kenyan or foreign legislation, rules, regulations or
						guidelines applicable to Kestrel, the Client or to the provision of
						the Services including the provisions of the Act and the rules and
						regulations made thereunder, all rules, regulations or by-laws of
						any relevant exchange and or clearing house (including banks), any
						order, award or other decision or finding of a court or
						quasi-judicial authority of competent jurisdiction, all statutory or
						other requirements relating to money laundering and applicable
						accepted market practice and custom;
					</p>
					<h2>Nominee Account:</h2>
					<p>
						means the account maintained by the Nominee specifying the
						Client&apos;s Securities and cash held by the Nominee on behalf of
						the Client pursuant to Clause 3.1 of this Agreement;
					</p>
					<h2>Nominee Trading Account:</h2>
					<p>
						means a securities trading account opened or to be opened with
						Kestrel in the name of the Nominee for the purposes of holding or
						otherwise dealing in the Client&apos;s Securities;
					</p>
					<h2>Securities:</h2>
					<p>
						means shares, stocks, bonds, debentures, notes, certificates of
						indebtedness, warrants, options, futures or financial instruments or
						other securities or assets (including cash);
					</p>
					<h2>Services:</h2>
					<p>has the meaning ascribed to it in Clause 4 of this Agreement;</p>
					<ul className='list-disc'>
						<li>
							A reference to a person shall include a natural person, corporate
							or unincorporated body (whether or not having separate legal
							personality) government, state or agency of a state and that
							person&apos;s successors and permitted assigns.
						</li>
						<li>
							The singular shall include the plural, masculine shall include the
							female and vice versa and the animate shall include the inanimate.
						</li>
						<li>
							Headings herein shall not affect the construction of this
							Agreement.
						</li>
						<li>
							Any obligation in this Agreement on a person not to do something
							includes an obligation not to agree or allow that thing to be
							done.
						</li>
						<li>
							References to writing shall include any mode of representing words
							in a legible and non-transitory form.
						</li>
						<li>
							References to times of the day are unless the context requires
							otherwise, to East African Standard time.
						</li>
						<li>
							All references to a statutory provision shall be construed as
							including references to any statutory modification, consolidation
							or re- enactment (whether before or after the date of this
							Agreement) for the time being in force; all statutory instruments
							or orders made pursuant to a statutory provision; and any
							statutory provisions of which a statutory provision is a
							consolidation, re-enactment or modification.
						</li>
						<li>
							The rule of construction that a contract shall be interpreted
							against the party responsible for the drafting or preparation of
							the contract, shall not apply to the extent that this Agreement
							has been negotiated between the Parties.
						</li>
					</ul>
					<h2>Appointment</h2>
					<ol className='list-[lower-alpha] list-outside space-y-5 px-5'>
						<li>
							The Client hereby unequivocally instructs and appoints the Nominee
							to hold, deal in and register the Client&apos;s Securities (in so
							far as any of the Client&apos;s Securities are registrable) in the
							Nominee&apos;s name pursuant to the terms of this Agreement
							PROVIDED ALWAYS that the Client shall at all times retain
							beneficial ownership and interest in the Client&apos;s Securities
							notwithstanding that the Nominee is recorded as the holder of the
							legal title.
						</li>
						<li>
							The Client acknowledges and accepts that the Client&apos;s
							Securities may be co-mingled in a common pool with other
							Securities held by the Nominee, its agent&apos;s, sub-nominees,
							subcontractors or counterparties on behalf of other clients.
						</li>
					</ol>
					<h2>Establishment of Accounts</h2>
					<ol className='list-[lower-alpha] list-outside px-5 space-y-5'>
						<li>
							The Client hereby unequivocally authorises the Nominee to open, at
							its absolute discretion, one or more accounts in the
							Nominee&apos;s books and accounts in respect of the Client&apos;s
							Securities and to segregate, in the Nominee&apos;s books and
							accounts, the Client&apos;s Securities from Securities held for
							the Nominee&apos;s own account or on account of third (3rd)
							parties.
						</li>
						<li>
							The Client hereby unequivocally instructs and authorises the
							Nominee to, at its sole discretion, open and maintain a Nominee
							Trading Account, in accordance with the Kestrel Terms and
							Conditions, to hold or otherwise deal in the Client&apos;s
							Securities.
						</li>
						<li>
							The Nominee may at any time, in its sole discretion and without
							any liability to the Client or any other person, refuse to accept
							any instructions to purchase Securities on behalf of the Client or
							otherwise deliver or procure the delivery of Securities into the
							Nominee Trading Account, without the need to give any reasons
							thereto.
						</li>
					</ol>
					<h2>Services</h2>
					<ol className='list-[lower-alpha] list-outside space-y-5 px-5'>
						<li>
							The Nominee is hereby unequivocally appointed and authorised to
							perform all or any of the following acts (the
							&quot;Services&quot;), and the Nominee accepts such appointment
							and authority save that the Nominee reserves the absolute right to
							refuse to perform any act or refrain from performing any act if,
							in its sole discretion, there are grounds for such refusal:
						</li>
						<ol className='list-[lower-roman] list-outside pl-10 space-y-5'>
							<li>
								to deal in the Client&apos;s Securities in accordance with the
								written or, at the discretion of the Nominee, oral instructions
								of the Client;
							</li>
							<li>
								to purchase or subscribe for any type of Security in accordance
								with the Client&apos;s instructions and following receipt of
								sufficient funds required for that purpose unless the Nominee
								permits, at its sole discretion, such other terms of payment
								from time to time as it may in its sole and absolute discretion
								deem fit;
							</li>
							<li>
								to hold or to arrange for the Client&apos;s Securities,
								including documents of title and any other instruments relating
								to the Client&apos;s Securities, to be held in safe custody;
							</li>
							<li>
								to receive and collect certificates or other evidence of title,
								transfer deeds or other instruments of transfer, cheques, sales
								proceeds and all other moneys payable or due to the Client in
								respect of the Client&apos;s Securities, with full power to give
								receipts and discharges for the same;
							</li>
							<li>
								to deliver documents of title and any other instruments relating
								to the Client&apos;s Securities to the Client or to the order of
								the Client in accordance with the Client&apos;s instructions but
								at the sole risk of the Client;
							</li>
							<li>
								to collect and/or receive, for the account of the Client, all
								income and other payments and distributions attributable to or
								in respect of the Client&apos;s Securities;
							</li>
							<li>
								to receive and hold for the account of the Client, all
								Securities received by the Nominee as a result of a stock
								dividend, share sub-division or reorganisation, capitalisation
								of reserves or otherwise;
							</li>
							<li>
								to deal with bonus issues, warrants and other similar interests
								offered to or received by the Nominee;
							</li>
							<li>
								to commence, prosecute, defend, continue and/or discontinue all
								actions, including without limitation, legal proceedings, claims
								and demands in respect of any of the matters set out in this
								Clause 4 with power to compromise or to submit to a judgment or
								order in any such actions or legal proceedings as aforesaid;
							</li>
							<li>
								to sell or otherwise dispose of the Client&apos;s Securities or
								any part(s) thereof and to deal with any proceeds in accordance
								with this Agreement;
							</li>
							<li>
								to agree upon the terms of, enter into and execute all
								agreements, forms, arrangements, undertakings, indemnities,
								transfers, assignments, guarantees and deeds and to do such
								things for and on behalf of the Client as the Nominee may deem
								necessary or expedient and at such time(s) as the Nominee shall
								deem fit in respect of or in relation to the Client&apos;s
								Securities or trading under a Nominee Trading Account;
							</li>
							<li>
								to open, carry on, supervise, conduct, manage and/or operate a
								Nominee Trading Account and to execute all necessary documents
								and/or forms issued by or required by any depository, securities
								exchange, counterparty broker, regulatory body or other party to
								give effect to the same;
							</li>
							<li>
								to issue, communicate, convey or transmit instructions, notices,
								requests, orders or demands in relation to the Client&apos;s
								Securities in any manner as the Nominee shall deem fit with full
								power and authority to assent, consent and agree to any
								modifications, variations, additions and amendments to such
								instructions, notices, requests, orders or demands as the
								Nominee may deem fit in order to give effect to the
								Client&apos;s instructions or to otherwise enable the Nominee
								carry out its obligations hereunder; and
							</li>
							<li>
								generally to act on and give effect to the instructions of the
								Client and to do, carry out or perform any or all actions that
								the Nominee deems fit to effect the Client&apos;s instructions.
							</li>
						</ol>
						<p>
							Nominee is authorised but not obliged to, at its absolute
							discretion, take such steps as it may consider expedient to enable
							it to provide the Services and to exercise its powers under this
							Agreement, including the right:
						</p>
						<ul className='list-[lower-roman] pl-10'>
							<li>
								to comply with any law, regulation, order, directive, notice or
								request of any government agency (whether or not having the
								force of law) requiring the Nominee to take or refrain from
								action;
							</li>
							<li>
								to withhold or make payment of any taxes or duties payable on or
								in respect of the Client&apos;s Securities on behalf of the
								Client;
							</li>
							<li>
								in the absence of or delay in receiving instructions from the
								Client in response to a request for instructions from the
								Nominee, to do such acts or refrain from doing any act that the
								Nominee may, at its absolute discretion, deem expedient in the
								circumstances; and
							</li>
							<li>
								to participate in and to comply with the rules and regulations
								of any system which provides securities exchange or clearing and
								settlement facilities in respect of the Client&apos;s
								Securities.
							</li>
						</ul>
						<li>
							The Nominee shall be under no duty to investigate, participate in
							or take any action concerning attendance at meetings, voting or
							other rights or enforcement of rights of whatever nature attaching
							to or derived from the Client&apos;s Securities except as may
							otherwise be expressly agreed to by the Nominee in writing.
						</li>
						<li>
							The Nominee shall not be responsible for monitoring, claiming or
							doing any other acts in relation to dividends, rights, bonus and
							any other entitlements or schemes of arrangement in connection
							with the Client&apos;s Securities except as may otherwise be
							expressly agreed to by the Nominee in writing.
						</li>
						<li>
							In the event that the Client instructs the Nominee to sell,
							transfer or otherwise deal in any Client Securities, then the
							Client shall ensure that all documents and information (including
							all title, transfer and all other documents pertaining to the
							transaction) are availed to the Nominee and duly completed and
							executed by the Client as may be requested by the Nominee.
						</li>
						<li>
							The Nominee may appoint any other person as its nominee
							(sub-nominee) or agent to perform any of the Services on its
							behalf and may delegate any of its powers under this Agreement to
							such person without notice to the Client.
						</li>
						<li>
							To the extent that the Client wishes to open multiple Nominee
							Accounts under this Agreement, all such accounts shall always be
							in the primary name of the Client. Furthermore, the Nominee shall
							always treat the Client as its client and shall never be obligated
							to communicate or deal directly with, or be liable to any third
							parties claiming through the Client.
						</li>
						<li>
							The Client shall provide such information or documentation that
							the Nominee may request from time to time to enable the Nominee
							provide the Services; including copies of the Client&apos;s
							certificate of incorporation, proof of directorships, regulatory
							licenses, lists of Authorized Persons and any other information
							requested by the Nominee for its files and records.
						</li>
						<li>
							The Nominee shall not be held liable for any implied losses or
							consequential damages.
						</li>
					</ol>
					<h2>Instructions and other Communication</h2>
					<ul className='list-disc'>
						<li>
							All instructions or other communication from the Client to the
							Nominee shall be given strictly in accordance with the Kestrel
							Terms and Conditions.
						</li>
						<li>
							The Client may, in accordance with the Nominee&apos;s requirements
							and the Kestrel Terms and Conditions, appoint an Authorized
							Person(s) to give instructions or other communications to the
							Nominee on behalf of the Client and the terms of the Kestrel Terms
							and Conditions and any agreement between the parties relating to
							the appointment of Authorised Persons shall apply to such
							instructions or communications.
						</li>
						<li>
							The Nominee shall be entitled but is not obliged to, accept
							instructions believed by it to have emanated from the Client or an
							Authorised Person(s) and the Nominee shall not be under any duty
							to verify the identity of the person(s) giving those instructions
							or the accuracy or truth of such instructions. The Client agrees
							and accepts that such instructions shall be binding upon the
							Client and the Nominee shall not be liable for taking any action
							or inaction pursuant to such instructions.
						</li>
						<li>
							The Nominee reserves the absolute right to refuse to act on the
							instructions of the Client or Authorised Persons, if in its
							absolute discretion, there are grounds for doing so but the
							Nominee shall not be bound to furnish the Client with any reason
							thereto.
						</li>
					</ul>
					<h2>Declarations, Representation and Warranties</h2>
					<ul className='list-disc'>
						<li>
							Client hereby declares, represents and warrants to the Nominee
							that:
						</li>
						<ol className='list-[lower-roman] mx-10'>
							<li>
								the particulars of the Client as furnished to the Nominee are
								true and accurate in all respects and will continue to be true
								and accurate in all respects at all times during the subsistence
								of this Agreement;
							</li>
							<li>
								this Agreement and the opening, use and operation of the
								relevant Nominee Trading Account shall be governed by the
								Kestrel Terms and Conditions and any Market Regulations;
							</li>
							<li>
								the Client is and shall at all times be deemed to be fully aware
								of and understand the terms and conditions contained in this
								Agreement and the Kestrel Terms and Conditions (whether the
								Client has actually perused through the same or otherwise);
							</li>
							<li>
								the Client shall be fully and directly responsible to Kestrel
								for all of the liabilities and obligations of or incurred by the
								Nominee on behalf of the Client in respect of the Services or
								otherwise under this Agreement;
							</li>
							<li>
								the Client is and shall at all times remain the ultimate and
								absolute beneficial owner of the Client&apos;s Securities and
								the only person entitled to all rights, title and interest in
								and to the Client&apos;s Securities;
							</li>
							<li>
								the Client is legally authorized and empowered to represent and
								transact business for its clients (where applicable);
							</li>
							<li>
								the Client is fully aware of all Market Regulations governing
								the dealing of the Client&apos;s Securities and the Client shall
								at all times observe and comply with all Market Regulations;
							</li>
							<li>
								the Client and any of its clients are sophisticated, qualified,
								experienced and knowledgeable investors who are fully capable of
								assuming all the risks associated with any investment related to
								this Agreement;
							</li>
							<li>
								the Client will not engage in insider trading or seek to
								otherwise use the Services or the Nominee Trading Account in any
								way that would constitute a breach of Market Regulations - for
								the purposes of this clause insider trading means trading of an
								entity&apos;s securities by persons in possession of material
								non-public information about that entity;
							</li>
							<li>
								no order has been made or resolution passed or petition
								presented for the winding up of the Client or for a provisional
								liquidator to be appointed in respect of the Client and no
								meeting has been convened for the purpose of winding-up the
								Client;
							</li>
							<li>
								no receiver has been appointed in respect of the Client or of
								all or any of its assets;
							</li>
							<li>
								no unsatisfied or unfulfilled judgement or Court order is
								outstanding against the Client;
							</li>
							<li>
								the Client has within the requisite time limits duly made all
								returns, given all notices and supplied all other information
								required to be supplied to taxation and customs and excise
								authorities and all such information, returns and notices were
								when given or supplied and are now accurate in all material
								respects and made on a proper basis and are not, so far as the
								Client is aware, liable to be the subject of any dispute with
								any of the relevant authorities concerned;
							</li>
							<li>
								the Client has duly deducted, withheld, paid and accounted for
								all tax due to have been deducted, withheld, paid or accounted
								for by it and is not and has not at any time from the date
								hereof been liable to pay interest or penalties on any unpaid
								taxation; and
							</li>
							<li>
								the Client has taken all the necessary corporate actions to
								authorise the performance of this agreement and shall execute
								any such documents as may be necessary for the implementation or
								effective execution of the transactions contemplated hereby.
							</li>
						</ol>
						<li>
							The warranties given by the Client in this Clause 6 shall be in
							addition to any warranties given by the Client under the Kestrel
							Terms and Conditions.
						</li>
					</ul>
					<h2>Income and Capital Distribution</h2>
					<p>
						Subject to any of the Nominee&apos;s rights of deduction or set-off
						under this Agreement, the Kestrel Terms and Conditions or under any
						Market Regulations, the Nominee shall pay to the Client all
						collection or receipt of dividends, distributions, proceeds of sale,
						benefits and other things of value with respect to the Client&apos;s
						Securities at any time whilst they are registered in the name of the
						Nominee or the Nominee&apos;s nominees or any of its agents or any
						other person appointed by the Nominee.
					</p>
					<h2>Relationship of the Parties and Liability</h2>
					<p>
						The provision of the Services does not constitute the Nominee as
						trustee and the Nominee shall have no trust or other obligations in
						respect of the Client&apos;s Securities except those contained in
						this Agreement or as otherwise agreed by the Nominee in writing.
					</p>
					<ul className='list-disc pl-10 mr-5'>
						<li>
							8.2 The Nominee is not acting under this Agreement as an
							investment manager or investment advisor to the Client.
						</li>
						<li>
							8.3 The Client shall at all times be liable for and irrevocably
							agrees that the Nominee shall not be liable for any taxes or
							duties payable on or in respect of the Client&apos;s Securities
							nor for any diminution in the value of the Client&apos;s
							Securities. Without prejudice to the foregoing, where the Nominee
							is liable for any taxes under any law in relation to the
							Client&apos;s Securities including, without limitation, any
							capital gains taxes, the Client hereby agrees and undertakes to,
							within five (5) Business Days of demand by the Nominee, pay the
							Nominee such amount as the Nominee may demand to make payment of
							such taxes.
						</li>
						<li>
							8.4 In addition to any exclusions under the Kestrel Terms and
							Conditions, the Client agrees and accepts that the Nominee shall
							not be liable for losses of any kind which may be incurred by the
							Client as a result of the provision of the Services by the Nominee
							or as a result of the Nominee exercising any or all of its rights
							and discretion as herein provided in this Agreement or the Kestrel
							Terms and Conditions.
						</li>
					</ul>
					<h2>Guarantee and Indemnity</h2>
					<ul className='list-disc'>
						<li>
							The Client hereby unconditionally and irrevocably guarantees to
							Kestrel (and each third party dealt with by the Nominee on behalf
							of the Client under this Agreement) on demand, without offset or
							limitation, as primary obligor and not merely as surety:
						</li>
						<ul className='list-[lower-roman] ml-10 mr-5'>
							<li>
								the due, punctual and full payment by the Client, on demand, of
								all amounts (including taxes) for which the Nominee or its
								Affiliates is or becomes liable (including any liability under
								any agreements with Kestrel or any third parties, this
								Agreement, the Kestrel Terms and Conditions or under any Market
								Regulation); and
							</li>
							<li>
								the due, punctual and full performance by the Client of, and
								compliance by the Client with, all covenants, terms and
								conditions (including any and all indemnities) for which the
								Nominee is or becomes liable (including under any agreements
								with third parties, this Agreement, the Kestrel Terms and
								Conditions or under any Market Regulation).
							</li>
						</ul>
						<li>
							The guarantee by the Client under this Clause, including all
							guarantees, covenants, indemnities, and agreements of the Client
							contained herein, is a continuing guarantee and shall remain in
							full force and effect and shall not be discharged until such time
							as all of the Nominee&apos;s obligations shall be indefeasibly
							paid in full in cash and duly performed or complied with in
							accordance with the terms thereof.
						</li>
						<li>
							The guarantee by the Client under this Clause is a guarantee of
							payment, performance and compliance and not of collectability, and
							no obligation of the Client is in any way conditioned or
							contingent upon any attempt to collect from or enforce performance
							or compliance by any person, or to exercise or assert any right or
							remedy to which Kestrel (and each third party dealt with by the
							Nominee on behalf of the Client under this Agreement) is or may be
							entitled (whether in connection with the Kestrel Terms and
							Conditions or any other document or instrument, any other event,
							contingency or circumstance whatsoever).
						</li>
						<li>
							The Client shall indemnify the Nominee and each and every of the
							Nominee&apos;s Affiliates, sub-nominees, agents and any other
							person appointed by it and their respective officers and employees
							and keep the same fully indemnified at all times against any and
							all claims, liabilities, damages, fees, costs and expenses of any
							kind which may be incurred by any of them and all actions or
							proceedings which may be brought against any of them in connection
							with:
						</li>
						<ol className='list-[lower-roman] ml-10 mr-5'>
							<li>the provision of the Services;</li>
							<li>
								the Nominee relying on any of the Client&apos;s declarations,
								undertakings, covenants, representations and warranties herein;
							</li>
							<li>
								the enforcement or attempted enforcement of the rights and/or
								remedies of the Nominee herein contained in this Agreement
								against the Client, including without limitation to any legal
								fees (on a solicitor and client basis);
							</li>
							<li>
								the Nominee having incurred obligations to any third party,
								including without limitation to Kestrel in the course of
								carrying out its obligations and covenants herein contained and
								in the provision of the Services;
							</li>
							<li>
								any transaction or service requested by the Client and
								subsequently performed or transmitted by the Nominee on behalf
								of the Client;
							</li>
							<li>any breach of law by the Client;</li>
							<li>
								any failure by the Client to perform or observe any of the
								Client&apos;s obligations under this Agreement;
							</li>
							<li>
								any representation or warranty made or given by the Client under
								this Agreement proving to be untrue or incorrect;
							</li>
							<li>
								any error, omission, fraud, malfeasance, negligence,
								misappropriation or criminal act by the Client or by any client,
								employee, agent or advisor of the Client; and
							</li>
							<li>
								any failure, error, omission or delay of the Client&apos;s
								computer or communications systems.
							</li>
						</ol>
						<li>
							The guarantee and indemnity referred to in this Clause 9 shall
							survive the termination of this Agreement.
						</li>
					</ul>
					<h2>Payment and Compensation</h2>
					<ul className='list-disc'>
						<li>
							All payments and other transfers of cash by the Nominee to the
							Client under this Agreement shall be made in accordance with the
							Kestrel Terms and Conditions and, where required by the Nominee,
							into an account(s) in the name of the Client, and the Nominee
							reserves the right to only remit and refund cash to account(s)
							representing the original source of funds for use by the Nominee
							under this Agreement.
						</li>
						<li>
							The Client shall be liable for and shall promptly pay on demand
							all regulatory, statutory fees and taxes in connection with the
							Client&apos;s instructions (including brokerage commissions on all
							purchase and sale transactions) to the Nominee under this
							Agreement.
						</li>
						<li>
							The Client shall, forthwith upon demand from the Nominee, pay fees
							to the Nominee for the provision of the Services for such amount
							as may be prescribed by the Nominee from time to time.
						</li>
						<li>
							Prior to the purchase of any Securities by the Nominee, the Client
							shall pre-fund and pay to the Nominee the purchase price and all
							associated costs in full and cleared funds, unless agreed
							otherwise in writing by the Nominee in advance. The Nominee shall
							not be obliged to effect any of the Client&apos;s instructions
							under this Agreement unless the Client shall have first performed
							its obligations under this Clause.
						</li>
						<li>
							Should the Nominee commit any funds towards the purchase of
							Securities on behalf of the Client pursuant to this Agreement, or
							complete a transaction to purchase or deliver Securities and the
							Client defaults in the payment to the Nominee of the purchase
							price of the Securities or defaults in completing any requirements
							of the sale or purchase transaction, the Nominee shall be fully
							and immediately reimbursed and indemnified by the Client for any
							funds it has committed in respect thereof and for any liability it
							may incur as a result of the Client&apos;s default.
						</li>
						<li>
							The Nominee may levy interest and penalty charges on any amount
							due and outstanding from the Client to the Nominee at the
							prevailing Barclays Bank of Kenya base lending rate plus 3%.
						</li>
						<li>
							Without prejudice to other rights of the Nominee, if the Client
							defaults and fails to pay amounts due on time, then the Nominee
							reserves the right to suspend or close the Nominee Account and
							recover amounts due through the sale of Securities at its sole
							discretion.
						</li>
						<li>
							The Client shall pay all taxes and fees in respect of the
							purchase, sale, transfer or any dealing by the Nominee in respect
							of the Client&apos;s Securities. The Client agrees to be directly
							responsible for and/or reimburse the Nominee on demand for any
							taxes, third party fees or expenses that the Nominee may be
							required to undertake as a result of providing services in respect
							of any securities held, purchased or transferred on the
							Client&apos;s behalf.
						</li>
						<li>
							Any and all tax liabilities (including any capital gains tax) and
							reporting requirements that may arise from the Services or may
							otherwise be in connection with the Client&apos;s Securities shall
							at all times be the responsibility of the Client
						</li>
						<li>
							The Client shall also forthwith upon the notice from the Nominee,
							pay to and/or reimburse the Nominee all other costs and expenses
							incurred by the Nominee, the Nominee&apos;s Affiliates, the
							Nominee&apos;s nominees or any of its agents or any other person
							appointed by it in the provision of the Services.
						</li>
						<li>
							A statement as to the nature and amount of fees, costs and
							expenses payable and/or reimbursable by the Client under this
							Agreement signed by any duly authorised officer of the Nominee
							shall be conclusive evidence against the Client of such fees,
							costs and expenses.
						</li>
					</ul>
					<h2>Right of Set-Off</h2>
					<ul className='list-disc'>
						<li>
							If any of the amounts payable under this Agreement remain
							outstanding after they have become due, reimbursable or payable,
							the Nominee shall, in addition to any other rights conferred by
							law or in this Agreement:
						</li>
						<ol className='list-[lower-roman] ml-10 mr-5'>
							<li>
								be entitled to debit automatically and/or set-off against any of
								the Client&apos;s Securities or any account of the Client with
								the Nominee or its Affiliates in or towards settlement of such
								outstanding amount(s); and
							</li>
							<li>
								unless otherwise prohibited by law, have a lien over the
								Securities with the power to sell any or all of the
								Client&apos;s Securities in or towards settlement of such
								outstanding amount(s).
							</li>
						</ol>
					</ul>
					<h2>Notices</h2>
					<p>
						Any notification given to the Nominee under this Agreement shall be
						in writing and sent to the address set out below or such other
						address as may be notified by the Nominee from time to time and such
						notice to the Nominee shall take effect upon its actual receipt by
						the Nominee:
					</p>
					<div className='ml-5 space-y-5'>
						<div>
							<p>Kestrel Capital Nominees Limited</p>
							<p>Orbit Place, 2nd Floor, Westlands Rd</p>
							<p>
								P.O. Box 40005 - 00100 <br />
								Nairobi, Kenya
							</p>
							<p>Email: Operations@kestrelcapital.com</p>
							<p>Website: www.kestrelcapital.com</p>
							<p>Attention: Head of Operations</p>
						</div>
						<p>
							All written notices or communication by the Nominee under this
							Agreement may be sent to the last postal or e-mail address
							notified to the Nominee by the Client or by posting such
							information on Kestrel&apos;s website (whose details are provided
							in Clause 12.1 above) and shall be deemed to have been received by
							the Client when sent to the relevant address or when posted on
							Kestrel&apos;s website.
						</p>
						<p>
							No change in the address of the parties hereto as specified in
							this Clause 12 howsoever brought about shall be effective or
							binding on either party unless that party has given to the other
							actual notices of such change of address and nothing done in
							reliance on this Clause 12 shall be affected or prejudiced by any
							subsequent change in the address of one party which the other
							party has no actual knowledge of at the time act or thing was done
							or carried out.
						</p>
					</div>
					<h2>Termination</h2>
					<ul className='list-disc'>
						<li>
							Either party may terminate this Agreement by thirty (30)
							days&apos; written notice to the other unless the parties mutually
							agree on a different time period.
						</li>
						<li>
							Notwithstanding Clause 13.1 above, the Nominee may give notice of
							immediate termination to the Client any time after the Client has
							contravened any of the provisions of this Agreement, passes a
							resolution for its winding-up or an order for the winding-up or
							the dissolution of the Client is made by a court of competent
							jurisdiction or where a receivership order in relation to the
							Client is made or issued or a receiver is appointed over or takes
							possession of the Client&apos;s assets or where an encumbrancer
							takes possession or otherwise sells any of the Client&apos;s
							assets or where the Client makes an arrangement or composition
							with its creditors generally or makes an application to a court of
							competent jurisdiction for protection from its creditors
							generally.
						</li>
						<li>
							Any termination of this Agreement and any withdrawals of the
							Client&apos;s Securities, whether or not following termination,
							shall be without prejudice to the right of the Nominee to settle
							any transactions entered into or to settle any liability incurred
							by the Client under this Agreement or by the Nominee on behalf of
							the Client prior to termination and/or at the discretion of the
							Nominee, to cancel any unexecuted instructions. The Client shall
							remain liable for all cost and expense incurred as a result of the
							Nominee settling such transactions and/or cancelling any
							unexecuted instructions.
						</li>
						<li>
							Upon termination, the Nominee shall transfer (or cause to be
							transferred) the Client&apos;s Securities as the Client shall
							direct.
						</li>
					</ul>
					<h2>Kestrel Terms and Conditions</h2>
					<p>
						The Kestrel Terms and Conditions are hereby incorporated into this
						Agreement as if the same were set out herein in extenso. If any
						material inconsistency is revealed between the Kestrel Terms and
						Conditions and this Agreement, the provisions of the Kestrel Terms
						and Conditions shall prevail. References to &quot;Kestrel&quot; in
						the Kestrel Terms and Conditions shall be deemed to refer to the
						Nominee and references to the &quot;Client&quot; in the Kestrel
						Terms and Conditions shall be deemed to refer to the Client.
					</p>
					<h2>Non-exclusivity</h2>
					<p>Nothing in this Agreement shall prevent:</p>
					<ul className='list-disc pl-10 mr-5'>
						<li>
							the Nominee or its Affiliates from acting as Nominee and or
							manager or in any other capacity whatsoever for any other company
							or body or persons on such terms as it may arrange and the Nominee
							shall not be deemed to be affected with notice of or to be under
							any duty to disclose to the Client (or any person claiming through
							the Client) any act or thing which may come to the knowledge of
							the Nominee or its Affiliates or any of their servants or agents
							on the course of so doing or in any manner whatsoever; and
						</li>
						<li>
							the Nominee or its Affiliates from contracting or entering into
							any financial, banking, commercial, advisory or other transaction
							with any company or body any of whose shares, stocks or bonds
							shall for the time being form part of the Client&apos;s Securities
							or from being interested in any such contract or transaction and
							neither Nominee nor its Affiliates shall be liable to account to
							the Client for any profits or benefits made or derived by or in
							connection with any such contract transaction or dealing.
						</li>
					</ul>
					<h2>Force Majeure</h2>
					<p>
						Whilst the Nominee shall endeavour to comply with its obligations
						herein in a timely manner, the Client hereby irrevocably agrees that
						the Nominee shall incur no liability whatsoever for any partial or
						non-performance of its obligations by reason of any cause beyond the
						Nominee&apos;s reasonable control including but not limited to any
						communications, systems or computer failure, market default,
						suspension, failure or closure, or the imposition or change
						(including a change of interpretation) of any law or governmental or
						regulatory requirement and the Nominee shall not be held liable for
						any loss that the Client may incur as a result thereof.
					</p>
					<h2>Miscellaneous</h2>
					<h3>NoWaiver</h3>
					<ul className='list-disc'>
						<li>
							No failure by the Nominee to exercise or delay in exercising any
							right or remedy under this Agreement shall constitute a waiver
							thereof and no single or partial exercise of any right or remedy
							under this Agreement shall preclude or restrict any further
							exercise of such right or remedy. The Nominee&apos;s rights and
							remedies contained in this Agreement are cumulative and not
							exclusive of any rights and remedies provided by law.
						</li>
					</ul>
					<h3>Knowledge or acquiescence</h3>
					<ul className='list-disc'>
						<li>
							Knowledge or acquiescence by the Nominee of, or in, any breach of
							any of the provisions of this Agreement shall not operate as, or
							be deemed to be, a waiver of such provisions and, notwithstanding
							such knowledge or acquiescence, the Nominee shall remain entitled
							to exercise its rights and remedies under this Agreement, and at
							law, and to require strict performance of all of the provisions of
							this Agreement.
						</li>
					</ul>
					<h3>Assignment</h3>
					<ul className='list-disc'>
						<li>
							The Client shall not assign or transfer any of its rights or
							obligations hereunder without the prior written consent of the
							Nominee.
						</li>
						<li>
							The Nominee may assign or transfer any of its rights or
							obligations hereunder to an Affiliate without notice to or consent
							from the Client.
						</li>
					</ul>
					<h3>Disclosure</h3>
					<ul className='list-disc'>
						<li>
							The Client hereby consents and authorizes the Nominee to disclose,
							to such extent as the Nominee shall deem necessary in its sole and
							absolute discretion, any and all information or documents it has
							concerning the Client or any other matters pertaining to the
							Services and this Agreement to any other person appointed by it in
							connection with the performance of the Services, the
							Nominee&apos;s Affiliates, assigns or any other party as the
							Nominee shall deem fit and/or as required by any law, regulation
							or directive, whether or not having the force of law.
						</li>
					</ul>
					<h3>Severability</h3>
					<ul className='list-disc'>
						<li>
							If any of the provisions of this Agreement is found by an
							arbitrator, court or other competent authority to be void or
							unenforceable, such provision shall be deemed to be deleted from
							this contract and the remaining provisions of this contract shall
							continue in full force and effect. Notwithstanding the foregoing,
							the Parties shall thereupon negotiate in good faith in order to
							agree the terms of a mutually satisfactory provision to be
							substituted for the provision so found to be void and
							unenforceable.
						</li>
					</ul>
					<h3>Governing Law and Dispute Resolution</h3>
					<ul className='list-disc'>
						<li>
							This Agreement shall be governed by and construed in accordance
							with Kenya law.
						</li>
						<li>
							If a dispute arises out of the terms of this Agreement the parties
							undertake to make every effort to reach an amicable settlement
							including scheduling and attending meetings. If an amicable
							settlement has not been reached within thirty (30) calendar days
							of the dispute first arising, then the dispute shall be referred
							to arbitration in accordance with this Clause.
						</li>
						<li>
							Any dispute, disagreement or question arising out of or relating
							to or in consequence of this Agreement or relating to its
							construction or performance which cannot be settled amicably as
							referred to in Clause 17.6.2 above shall be referred to and
							finally resolved by arbitration in Kenya in accordance with the
							provisions of the Arbitration Act, 1995 of the laws of Kenya by
							one or more arbitrators appointed by the Chairman for the time
							being of the Chartered Institute of Arbitration, Kenya Branch, on
							the application of a party. The language of the arbitration shall
							be English. Each party shall bear its own cost of preparing and
							presenting its case. The costs of arbitration (including fees and
							expenses of the arbitrators) shall be shared equally between the
							parties unless the award provides otherwise.
						</li>
						<li>
							The terms of this Agreement shall not prevent or delay the parties
							from seeking orders for specific performance or interim or final
							injunctive relief on a without notice basis or otherwise and the
							terms of Clauses 17.6.2 and 17.6.3 above shall not apply to any
							circumstances where such remedies are sought.
						</li>
						<li>
							Any order, award or other decision or finding of a court of
							competent jurisdiction and/or the arbitrator(s) or any agreement
							reached by way of settlement between the parties in respect of any
							dispute, disagreement or question arising out of or relating to or
							in consequence of this Agreement or relating to its construction
							or performance shall be enforceable in any jurisdiction in which
							either of the parties has assets.
						</li>
					</ul>
					<h3>Counterparts</h3>
					<ul className='list-disc'>
						<li>
							This Agreement may be executed in one or more counterparts, each
							of which will be deemed to be an original copy of this Agreement
							and all of which, when taken together, will be deemed to
							constitute one and the same Agreement, but shall not be effective
							until each party has executed at least one counterpart.
						</li>
					</ul>
					<h3>Time of the essence</h3>
					<ul className='list-disc'>
						<li>
							Except as may be otherwise set out in this Agreement (including
							the Schedules), time shall be of the essence for all purposes of
							this Agreement, both as regards the dates and periods specifically
							mentioned and as to any dates and periods which may be substituted
							by agreement in writing between or on behalf of the Parties.
						</li>
					</ul>
					<h3>Amendments</h3>
					<ul className='list-disc'>
						<li>
							The Nominee reserves the right at any time and from time to time
							to add, modify, alter and or amend any of the terms and conditions
							of this Agreement by giving notice in writing to the Client and
							any such modification, alteration and or amendment shall take
							effect from the date specified in the notice.
						</li>
					</ul>
				</div>
				<div>
					<FormField
						control={control}
						name={fieldName}
						rules={{
							required: 'You must upload your signature to continue',
						}}
						render={({ field }) => (
							<FormItem className='space-y-2'>
								<FormControl>
									<SignatureUploader
										previewURL={previewURL}
										isLoading={signatureStatus.processing}
										onFileUpload={async (file) => {
											if (!file) return;

											setSignatureStatus((status) => ({
												...status,
												processing: true,
											}));

											const formData = {
												file: file,
											};

											const uploadURL = await FormHelpers.statelessRequest<
												typeof formData,
												{ url: string }
											>('/api/onboarding/uploads?clientId=' + clientID, {
												method: 'POST',
												data: formData,
												headers: {
													'Content-Type': 'multipart/form-data',
												},
											});

											if (!uploadURL) {
												setSignatureStatus({
													processing: false,
													error: true,
												});
												return;
											}

											field.onChange(uploadURL.url);
											setValue(
												`_formMetadata.applicant.${applicantId}.kestrelSignatureFileName`,
												file.name
											);
										}}
										fileName={kestrelSignatureFileName}
										name={field.name}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>
		</div>
	);
}
