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
    const getReviewComponent = ( field: FactoryFieldType ) =>
    {
        const reviewFieldConfig = {
            field: props.reviewerOverride?.type ?? field,
            name: props.reviewerOverride?.name ?? props.name,
            label: props.reviewerOverride?.label ?? props.label
        };

		switch (reviewFieldConfig.field) {
			case 'date':
			case 'dropdown':
			case 'radio':
			case 'agreement':
			case 'text':
				return (
					<PrimitiveFieldReviewer
						name={reviewFieldConfig.name}
						label={reviewFieldConfig.label}
					/>
				);
			case 'phone':
			case 'checkbox':
				return (
					<ArrayFieldReviewer
						fieldType={fieldType}
						name={reviewFieldConfig.name}
						label={reviewFieldConfig.label}
					/>
				);
			case 'signature':
				return (
					<SignatureFieldReviewer
						name={reviewFieldConfig.name}
						label={reviewFieldConfig.label}
					/>
				);
			case 'file-upload':
				return (
					<FileUploadReviewer
						name={reviewFieldConfig.name}
						label={reviewFieldConfig.label}
					/>
				);
			default:
				throw new Error(`Field type ${fieldType} cannot be reviewed`);
		}
	};

	return <>{getReviewComponent(fieldType)}</>;
}
