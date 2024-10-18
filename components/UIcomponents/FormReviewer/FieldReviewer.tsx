import type {
	FormFactoryProps,
	FactoryFieldType,
} from '@/types/Components/formFactory';
import { PrimitiveFieldReviewer } from './ReviewerComponents/PrimitiveFieldReviewer';
import { ArrayFieldReviewer } from './ReviewerComponents/ArrayFieldReviewer';

interface FieldReviewerProps extends FormFactoryProps {}

export function FieldReviewer({
	fieldType,
	...props
}: FieldReviewerProps) {
	const getReviewComponent = (field: FactoryFieldType) => {
		switch (field) {
			case 'date':
			case 'dropdown':
			case 'radio':
			case 'text':
				return (
					<PrimitiveFieldReviewer
						name={props.name}
						label={props.label}
					/>
				);
			case 'phone':
			case 'checkbox':
				return (
					<ArrayFieldReviewer
						fieldType={fieldType}
						name={props.name}
						label={props.label}
					/>
				);
			default:
				throw new Error(`Field type ${fieldType} cannot be reviewed`);
		}
	};

	return <>{getReviewComponent(fieldType)}</>;
}
