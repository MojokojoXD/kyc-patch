import { FormHeader, FormTitle, FormContent } from '@/components/FormLayout';
import FormFactory from '@/components/FormFactory';
import { investmentCatergoryFields } from './formBuilder/InvestmentCategoryFormBuilder';
import type { FormStep } from '@/types/Components/onboarding';

export const InvestmentCategory: FormStep = () => {
	return (
		<>
			<FormHeader>
				<FormTitle>Category of Investment</FormTitle>
			</FormHeader>
			<FormContent>
				<div className='space-y-[40px] py-5'>
					{investmentCatergoryFields.map((f) => (
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
