import { LoaderCircle } from "lucide-react"

export default function Loading()
{
    return (
        <div className="fixed z-[100] inset-0 flex justify-center items-center bg-neutral-200/50">
            <LoaderCircle className="animate-spin text-primary-500 w-10 h-10"/>
        </div>
    )
}