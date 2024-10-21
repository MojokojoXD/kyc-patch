import type {
	FormFactoryProps,
	FactoryFieldType,
} from '@/types/Components/formFactory';
import { PrimitiveFieldReviewer } from './ReviewerComponents/PrimitiveFieldReviewer';
import { ArrayFieldReviewer } from './ReviewerComponents/ArrayFieldReviewer';
import { SignatureFieldReviewer } from './ReviewerComponents/SignatureFieldReviewer';
import { FileUploadReviewer } from './ReviewerComponents/FileUploadReviewer';

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
			case 'agreement':
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
			case 'signature':
				return (
					<SignatureFieldReviewer
						name={props.name}
						label={props.label}
					/>
				);
			case 'file-upload':
				return (
					<FileUploadReviewer
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
