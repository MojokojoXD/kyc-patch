import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";

type CustomProgressProps<TFormSteps> = {
    maxSteps: number;
    currentStep: TFormSteps;
    disable?: boolean;
};


export default function CustomProgress<TFormSteps>( { maxSteps, currentStep, disable }: CustomProgressProps<TFormSteps> )
{
    const progressPercentage = ( (  currentStep as number) / maxSteps ) * 100;

    return (
        <div className={'fixed top-3 left-0 z-[70] sm:max-w-xs w-2/6 min-w-72 h-24 flex flex-col justify-center items-center p-6 text-neutral-700'}>
                <div className='w-full'>
                    <p className={cn('w-full font-medium ', disable && "text-neutral-700/20")}>PROGRESS</p>
                    <div className="flex items-center space-x-1">
                        <Progress
                            max={maxSteps}
                            value={progressPercentage}
                            className={cn('w-full border border-neutral-200 bg-transparent grow', disable && "border-neutral-700/20")}
                        />
                        <span className={cn("text-sm", disable && "text-neutral-700/20")}>{disable ? 0 :  `${currentStep}/${maxSteps}` }</span>
                    </div>
                </div>
			</div>
    )
}