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

    const fieldValue = getValues( name as Path<IndividualFormSchema> );

    return (
        <div className="space-y-[8px]">
            {label && <h2 className="paragraph2Medium">{ label }</h2>}
            <p className="paragraph2Book text-neutral-500">{ fieldValue || 'n/a' }</p>
        </div>
    )
} 