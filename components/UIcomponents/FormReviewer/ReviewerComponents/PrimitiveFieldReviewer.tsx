import { useFormContext } from "react-hook-form";
import type { IndividualFormSchema } from "@/types/forms/individual";
import type { Path } from "react-hook-form";

interface PrimitiveFieldReviewerProps
{
    name: string;
    label: string;
}

export function PrimitiveFieldReviewer( { name,label }: PrimitiveFieldReviewerProps )
{
    const { getValues } = useFormContext<IndividualFormSchema>();

    let fieldValue = getValues( name as Path<IndividualFormSchema> );

    if ( typeof fieldValue === 'boolean' )
    {
        fieldValue = fieldValue.toString();
    }

    return (
        <div className="space-y-[8px]">
            {label && <h2 className="paragraph2Medium text-neutral-700">{ label }</h2>}
            <p className="paragraph2Regular text-neutral-500 capitalize">{ fieldValue || 'n/a' }</p>
        </div>
    )
} 