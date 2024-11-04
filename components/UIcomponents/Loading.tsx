import { LoaderCircle } from "lucide-react"
import { cn } from "@/lib/utils";

interface LoadingProps
{
    reveal: boolean;
}

export default function Loading({ reveal = false }: LoadingProps)
{
    return (
        <div className={cn("fixed inset-0 flex justify-center items-center transition-all duration-300 ease-in-out -z-10 opacity-0 delay-500 bg-white/70", reveal && ' z-50 opacity-100')}>
            <LoaderCircle className="animate-spin text-primary-500 w-10 h-10"/>
        </div>
    )
}