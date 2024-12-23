import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

type CustomProgressProps = {
	maxSteps: number;
	currentStep: number;
	disable?: boolean;
};

export function CustomProgress({
	maxSteps,
	currentStep,
	disable,
}: CustomProgressProps) {
	const progressPercentage = (currentStep / maxSteps) * 100;

	return (
		<div
			className={
				'flex flex-col justify-center items-center p-6 text-neutral-700'
			}>
			<div className='w-full'>
				<p
					className={cn(
						'w-full paragraph1Medium mb-1',
						disable && 'text-neutral-700/20'
					)}>
					PROGRESS
				</p>
				<div className='flex items-center space-x-1'>
					<Progress
						max={maxSteps}
						value={progressPercentage}
						className={cn(
							'w-full border border-neutral-100 bg-transparent grow',
							disable && 'border-neutral-700/20'
						)}
					/>
					<span
						className={cn('paragraph1Regular', disable && 'text-neutral-700/20')}>
						{disable ? 0 : `${currentStep}/${maxSteps}`}
					</span>
				</div>
			</div>
		</div>
	);
}
