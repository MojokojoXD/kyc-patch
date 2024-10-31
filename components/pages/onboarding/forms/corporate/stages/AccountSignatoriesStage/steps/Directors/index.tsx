import { useEffect, useMemo } from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import { Button } from '@/components/UIcomponents/ui/button';
import {
	FormHeader,
	FormContent,
	FormTitle,
} from '@/components/UIcomponents/FormLayout';
import FormFactory from '@/components/UIcomponents/FormFactory';
import Markdown from 'react-markdown';
import { CircleAlert, CirclePlus, Trash2 } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import { useKYCFormContext } from '@/components/pages/onboarding/forms/utils/formController';
import { directorsDefaultValues, directorsModel } from './model/directorsModel';
import type { SingleFormFieldsGeneratorProps } from '@/types/Components/onboarding';
import type { FormStep } from '@/types/Components/onboarding';
import type { Director } from '@/types/forms/corporateSchema';
import type { Signatory } from '@/types/forms/corporateSchema';
import { FormFieldAggregator } from '@/components/pages/onboarding/forms/utils/FormFieldAggregator';
import type { CorporateFormSchema } from '@/types/forms/corporateSchema';

const MAX_INDIVIDUALS = 2;

const collateDirectorsFromSignatories = ( signatories: Signatory[] ): Director[] => {
    const collationResult: Director[] = [];

    signatories.forEach((s) => {
        if (!s.role.includes('Director')) return;

        collationResult.push({
            id: s.id,
            firstName: s.firstName,
            middleName: s.middleName ?? '',
            lastName: s.lastName,
            idType: s.proofOfIdentity?.idType || '',
            idNumber: s.proofOfIdentity?.idNumber || '',
            residentialAddress: s.address.residentialAddress,
            phoneNumber: [{ value: '' }],
            dateOfBirth: s.dateOfBirth,
            ownership: '',
            status: 'non-Executive',
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

export const Directors: FormStep = ({ countryList }) => {
	const { form } = useKYCFormContext<CorporateFormSchema>();
	const { control, setValue, watch, getValues } = form;
	const { fields, append, remove } = useFieldArray({
		name: 'accountSignatories.directors',
		control,
	});

	const signatories = getValues('accountSignatories.signatories') as Signatory[];

	const currentDirectors = getValues(
		'accountSignatories.directors'
	) as Director[];


	useEffect(() => {
		let directorsFromSignatory = collateDirectorsFromSignatories( signatories );

		const directorsInit =
			directorsFromSignatory.length > 0
				? directorsFromSignatory
				: [directorsDefaultValues];

		if (!currentDirectors || currentDirectors.length === 0) {
			setValue('accountSignatories.directors', directorsInit);
			return;
		}

		const result: Director[] = [];

		currentDirectors.forEach((d) => {
			if (!d.isPrefill) {
				result.push(d);
				return;
			}

			const existingDirectorFromSignatory = directorsFromSignatory.filter(
				(s) => s.id === d.id
			);

			if (existingDirectorFromSignatory.length !== 0) {
				const mergedDirector: Director = {
					id: existingDirectorFromSignatory[0].id,
					firstName: existingDirectorFromSignatory[0].firstName,
					lastName: existingDirectorFromSignatory[0].lastName,
					middleName: existingDirectorFromSignatory[0].middleName,
					idType: existingDirectorFromSignatory[0].idType,
					idNumber: existingDirectorFromSignatory[0].idNumber,
					phoneNumber: [...d.phoneNumber],
					residentialAddress: existingDirectorFromSignatory[0].residentialAddress,
					dateOfBirth: existingDirectorFromSignatory[0].dateOfBirth,
					status: d.status,
					pepInfo: { ...existingDirectorFromSignatory[0].pepInfo },
					ownership: d.ownership,
					isPrefill: existingDirectorFromSignatory[0].isPrefill,
				};
				result.push(mergedDirector);
				directorsFromSignatory = directorsFromSignatory.filter(
					(s) => s.id !== d.id
				);
			}
		});

		if (result.length === 0) {
			result.push(directorsDefaultValues);
		}

		setValue('accountSignatories.directors', [
			...directorsFromSignatory,
			...result,
		]);
    }, [] );
    
	return (
		<>
			<FormHeader>
				<FormTitle>Directors</FormTitle>
			</FormHeader>
			<FormContent>
				<ul className='space-y-[8px]'>
					{fields.map((f, i) => {
						const firstName = watch(
							`accountSignatories.directors.${i}.firstName`
						) as string;
						const lastName = watch(
							`accountSignatories.directors.${i}.lastName`
						) as string;
						const isPrefill = getValues(
							`accountSignatories.directors.${i}.isPrefill`
						) as boolean;
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
											className='data-[state=closed]:hidden pb-16'
											forceMount>
											<DirectorForm
												applicantId={i}
												countryList={countryList}
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
							disabled={fields.length >= MAX_INDIVIDUALS}
							onClick={() => append(directorsDefaultValues)}
							className='text-base text-primary-500'>
							<span className='mr-1'>
								<CirclePlus className='h-4 w-4' />
							</span>
							Add another individual
						</Button>
					</li>
				</ul>
			</FormContent>
		</>
	);
};

interface DirectorFormProps extends SingleFormFieldsGeneratorProps {}

const headerText = `
## **Auto-populated fields**

Some fields have been carried forward from your earlier responses.
To maintain accuracy and consistency in your application, these
details cannot be modified here.

`;

function DirectorForm({ applicantId, countryList }: DirectorFormProps) {
	const { form } = useKYCFormContext<CorporateFormSchema>();
	const { watch } = form;

	const isApplicantPrefilled =
		(watch(`accountSignatories.directors.${applicantId}.isPrefill`) as boolean) ||
		false;
	const pepStatus =
		(watch(
			`accountSignatories.directors.${applicantId}.pepInfo.isPep`
		) as string) || '';

	const fields = useMemo(() => {
		const rawFields = directorsModel({ index: applicantId, countryList });
		const aggregator = new FormFieldAggregator(rawFields);

		aggregator.modifyFields('read-only', {
			readonly: isApplicantPrefilled,
		});

		aggregator.modifyFields('remove', {
			remove: pepStatus === 'No' || !pepStatus,
		});

		return aggregator.generate();
	}, [applicantId, countryList, isApplicantPrefilled, pepStatus]);

	return (
		<>
			{isApplicantPrefilled && (
				<div
					className='bg-neutral-50 p-5 rounded-lg border border-neutral-200 
            [&>h2]:text-neutral-700 flex space-x-5 text-sm text-neutral-600'>
					<div>
						<CircleAlert className='h-5 w-5 text-primary-500' />
					</div>
					<div>
						<Markdown>{headerText}</Markdown>
					</div>
				</div>
			)}
			{fields.map((f) => (
				<FormFactory
					key={f.name}
					{...f}
				/>
			))}
		</>
	);
}
