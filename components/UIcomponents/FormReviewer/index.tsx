import type {
	FormFactoryProps,
	FactoryFieldType,
} from '@/types/Components/formFactory';

type ReviewSectionProps = Pick<
	FormFactoryProps,
	'label' | 'fieldType' | 'name'
>;

interface FormReviewerProps extends ReviewSectionProps {}

function FormReviewer({ fieldType, ...props }: FormReviewerProps);
{
	const getReviewComponent = (field: FactoryFieldType) => {
		switch (field) {
			case 'date':
			case 'dropdown':
			case 'phone':
			case 'radio':
			case 'text':
				return <p>primitive types</p>;
			case 'checkbox':
				return <p>collection types</p>;
			default:
				throw new Error(`Field type ${fieldType} cannot be reviewed`);
		}
	};

	return <>{getReviewComponent(fieldType)}</>;
}

export { FormReviewer };
