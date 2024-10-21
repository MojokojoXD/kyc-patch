import { useFormContext } from "react-hook-form";
import type { IndividualFormSchema } from "@/types/forms/individual";
import type { Path } from "react-hook-form";

interface FileUploadReviewerProps
{
    name: string;
    label: string;
}

export function FileUploadReviewer( { name,label }: FileUploadReviewerProps )
{
    const { getValues } = useFormContext<IndividualFormSchema>();

    const fieldValue = getValues( name as Path<IndividualFormSchema> );

    return (
        <div className="space-y-[8px]">
            {label && <h2 className="paragraph2Medium text-neutral-700">{ label }</h2>}
            <p className="paragraph2Regular text-neutral-500 capitalize">{ fieldValue ? 'Uploaded' : 'n/a' }</p>
        </div>
    )
} 