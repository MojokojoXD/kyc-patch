import { useEffect, useMemo } from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
	FormHeader,
	FormContent,
	FormTitle,
} from '@/components/forms/FormLayout';
import FormFactory from '@/components/forms/FormFactory';
import { CirclePlus, Trash2 } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import { useKYCFormContext } from '@/components/forms/utils/formController';
import {
	beneficialOwnersDefaultValues,
	beneficialOwnersModel,
} from './model/beneficialOwnerModel';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import type { FormStep } from '@/types/Components/onboarding';
import type { BeneficialOwner } from '@/types/forms/corporateSchema';
import type { Signatory } from '@/types/forms/corporateSchema';
import { FormFieldAggregator } from '@/components/forms/utils/FormFieldAggregator';
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';
import { PrefillBannerDesc } from '../../PrefillBannerDesc';
import { MAX_BENEFICIAL_OWNERS } from './model/beneficialOwnerModel';

const collateBeneficalOwnersFromSignatories = (
	signatories: Signatory[]
): BeneficialOwner[] => {
	const collationResult: BeneficialOwner[] = [];

	signatories.forEach((s) => {
		if (!s.role.includes('Beneficial Owner')) return;

		collationResult.push({
			id: s._id,
			firstName: s.firstName ?? '',
			middleName: s.middleName ?? '',
			lastName: s.lastName ?? '',
			idType: s.proofOfIdentity?.idType || '',
			idNumber: s.proofOfIdentity?.idNumber || '',
			residentialAddress: s.address.residentialAddress,
			phoneNumber: [...s.address.phoneNumber],
			dateOfBirth: s.dateOfBirth ?? '',
			ownership: '',
			pepInfo: {
				isPep: s.pepInfo?.isPep || 'No',
				pepDetails: {
					desc: s.pepInfo?.pepDetails?.desc || '',
					country: s.pepInfo?.pepDetails?.country || '',
				},
			},
			isPrefill: true,
		});
	});

	return collationResult;
};

export const BeneficialOwners: FormStep = () => {
	const { form } = useKYCFormContext<CorporateFormSchema>();
	const { control, setValue, watch, getValues } = form;
	const { fields, append, remove } = useFieldArray({
		name: 'accountSignatories.beneficialOwners',
		control,
	});

	const signatories = getValues('accountSignatories.signatories') as Signatory[];

	const currentBeneficialOwners = getValues(
		'accountSignatories.beneficialOwners'
	) as BeneficialOwner[];

	useEffect(() => {
		let beneficialOwnersFromSignatories =
			collateBeneficalOwnersFromSignatories(signatories);

		const beneficialOwnerInit =
			beneficialOwnersFromSignatories.length > 0
				? beneficialOwnersFromSignatories
				: [beneficialOwnersDefaultValues];

		if (!currentBeneficialOwners || currentBeneficialOwners.length === 0) {
			setValue('accountSignatories.beneficialOwners', beneficialOwnerInit);
			return;
		}

		const result: BeneficialOwner[] = [];

		currentBeneficialOwners.forEach((b) => {
			if (!b.isPrefill) {
				result.push(b);
				return;
			}

			const existingBownerFromSignatory = beneficialOwnersFromSignatories.filter(
				(s) => s.id === b.id
			);

			if (existingBownerFromSignatory.length !== 0) {
				const mergedBeneficialOwner: BeneficialOwner = {
					// id: existingBownerFromSignatory[0].id,
					// firstName: existingBownerFromSignatory[0].firstName,
					// lastName: existingBownerFromSignatory[0].lastName,
					// middleName: existingBownerFromSignatory[0].middleName,
					// idType: existingBownerFromSignatory[0].idType,
					// idNumber: existingBownerFromSignatory[0].idNumber,
					// phoneNumber: [...existingBownerFromSignatory[0].phoneNumber],
					// residentialAddress: existingBownerFromSignatory[0].residentialAddress,
					// dateOfBirth: existingBownerFromSignatory[0].dateOfBirth,
					// pepInfo: { ...existingBownerFromSignatory[0].pepInfo },
					// ownership: b.ownership,
					// isPrefill: existingBownerFromSignatory[0].isPrefill,
					...existingBownerFromSignatory[0],
					ownership: b.ownership,
				};
				result.push(mergedBeneficialOwner);
				beneficialOwnersFromSignatories = beneficialOwnersFromSignatories.filter(
					(s) => s.id !== b.id
				);
			}
		});

		if (result.length === 0) {
			result.push(beneficialOwnersDefaultValues);
		}

		setValue('accountSignatories.beneficialOwners', [
			...beneficialOwnersFromSignatories,
			...result,
		]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<FormHeader>
				<FormTitle>Beneficial Owners</FormTitle>
			</FormHeader>
			<FormContent>
				<ul className='space-y-[8px]'>
					{fields.map((f, i) => {
						const firstName = watch(`accountSignatories.beneficialOwners.${i}.firstName`);
						const lastName = watch(`accountSignatories.beneficialOwners.${i}.lastName`);

						const isPrefill = getValues(
							`accountSignatories.beneficialOwners.${i}.isPrefill`
						);

						return (
							<li key={f.id}>
								<Accordion
									defaultValue={`item-0`}
									collapsible
									type={'single'}>
									<AccordionItem value={`item-${i}`}>
										<AccordionTrigger>
											<div className='flex items-center space-x-2'>
												{i > 0 && !isPrefill && (
													<span
														onClick={() => remove(i)}
														className='h-fit py-0 w-fit px-0 text-primary-500'>
														<Trash2 className='h-5 w-5' />
													</span>
												)}
												<p className='inline-block'>
													Individual #{i + 1}: {firstName} {lastName}
												</p>
											</div>
										</AccordionTrigger>
										<AccordionContent
											className='data-[state=closed]:hidden pb-16 overflow-visible'
											forceMount>
											<BeneficialOwnerForm
												applicantId={i}
											/>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</li>
						);
					})}
					<li>
						<Button
							type='button'
							size={'sm'}
							variant={'ghost'}
							disabled={fields.length >= MAX_BENEFICIAL_OWNERS}
							onClick={() => append(beneficialOwnersDefaultValues)}
							className='text-base text-primary-500'>
							<span className='mr-1'>
								<CirclePlus className='h-5 w-5' />
							</span>
							Add another Individual
						</Button>
					</li>
				</ul>
			</FormContent>
		</>
	);
};

interface BeneficialOwnerFormProps extends SingleFormFieldsGeneratorProps {}

function BeneficialOwnerForm({
	applicantId,
}: BeneficialOwnerFormProps) {
	const { form } = useKYCFormContext<CorporateFormSchema>();
	const { getValues, watch } = form;

	const isApplicantPrefilled =
		(getValues(
			`accountSignatories.beneficialOwners.${applicantId}.isPrefill`
		) as boolean) || false;
	const pepStatus =
		(watch(
			`accountSignatories.beneficialOwners.${applicantId}.pepInfo.isPep`
		) as string) || '';

	const fields = useMemo(() => {
		const rawFields = beneficialOwnersModel({ index: applicantId });
		const aggregator = new FormFieldAggregator(rawFields);

		aggregator.modifyFields('read-only', {
			readonly: isApplicantPrefilled,
		});

		aggregator.modifyFields('remove', {
			remove: pepStatus === 'No' || !pepStatus,
		});

		return aggregator.generate();
	}, [applicantId, isApplicantPrefilled, pepStatus]);

	return (
		<>
			{isApplicantPrefilled && <PrefillBannerDesc />}
			{fields.map((f) => (
				<FormFactory
					key={f.name}
					{...f}
				/>
			))}
		</>
	);
}
