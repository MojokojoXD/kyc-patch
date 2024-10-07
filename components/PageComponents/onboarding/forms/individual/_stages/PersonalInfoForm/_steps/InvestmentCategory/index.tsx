import {
	FormHeader,
	FormTitle,
	FormContent,
} from '@/components/UIcomponents/FormLayout';
import FormFactory from '@/components/UIcomponents/FormFactory';
import { investmentCatergoryFields } from './formBuilder/InvestmentCategoryFormBuilder';

export default function InvestmentCategory() {
	return (
		<>
			<FormHeader>
				<FormTitle>Category of Investment</FormTitle>
			</FormHeader>
			<FormContent>
				<div className='space-y-[40px]'>
                    {
                        investmentCatergoryFields.map( f => (
                            <FormFactory key={f.name} {...f}/>
                        ))
                    }
				</div>
			</FormContent>
		</>
	);
}
