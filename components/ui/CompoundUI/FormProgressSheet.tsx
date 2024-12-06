import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { CustomProgress } from './CustomProgress';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';

type ProgressStage = {
	readonly name: string;
	readonly steps: readonly string[];
};

interface FormProgressSheetProps<TSteps> {
	formStages: readonly TSteps[];
	formAction: ( stage: string, step?: string ) => void;
	stage: string;
	step: string;
}

export default function FormProgressSheet<T extends ProgressStage>({
	formStages,
	formAction,
	stage,
	step,
}: FormProgressSheetProps<T>) {
	const [currentStage, setCurrentStage] = useState<string>(stage);

	const progressStep = useRef(new Set<string>());
	const progressStage = useRef(new Set<string>());

	progressStage.current.add(stage);
	progressStep.current.add(step);

	const maxNumberOfSteps = formStages.reduce((a, c) => a + c.steps.length, 0);

	useEffect(() => {
		const stepElement = document.getElementById(step);
		stepElement?.scrollIntoView();
	}, [step]);

	useEffect(() => {
		setCurrentStage(stage);
	}, [stage, setCurrentStage]);

	return (
		<div className='bg-white h-full w-full max-w-xs overflow-hidden px-5 border-r border-neutral-100 shadow-sm'>
			<div className='h-full'>
				<div className='h-20'>
					<CustomProgress
						maxSteps={maxNumberOfSteps}
						currentStep={progressStep.current.size}
					/>
				</div>
				<ol
					className='font-normal text-neutral-700/95 list-inside overflow-auto max-h-[40rem] py-8 list-decimal'
					style={{
						scrollbarWidth: 'thin',
					}}>
					<Accordion
						type={'single'}
						collapsible
						value={stage || currentStage}
						onValueChange={setCurrentStage}>
						{formStages.map((_stage) => (
							<AccordionItem
								key={_stage.name}
								value={_stage.name}
								className={cn(
									'w-full outline-none focus-visible:outline-none focus-visible-ring-none hover:no-underline border-none bg-transparent py-0 h-fit border-none'
								)}>
								<AccordionTrigger
									onClick={() => {
										if (_stage.name === stage) return;
										formAction(_stage.name);
									}}
									disabled={!progressStage.current.has(_stage.name)}
									className='border-none data-[state=closed]:rounded-none data-[state=open]:rounded-none bg-transparent px-5 leading-relaxed text-base font-medium text-neutral-700 capitalize'>
									<li>{_stage.name}</li>
								</AccordionTrigger>
                <AccordionContent className={ 'relative py-0 border-none' }>
                  {/* Step Buttons */}
									<ul
										className='list-inside h-fit space-y-2 max-h-36 overflow-auto'
                    style={ { scrollbarWidth: 'thin' } }>
                    {/* Design element only */}
										<div className='absolute h-full border-l border-neutral-200'></div>
										{_stage.steps.map((_step) => (
											<Button
												key={_step}
												id={_step}
												variant={'link'}
												disabled={!progressStep.current.has(_step)}
												onClick={() =>
													formAction(_stage.name,_step)
												}
												size={'sm'}
												className={cn(
													'relative text-sm capitalize h-fit py-0 font-normal text-neutral-700 block hover:no-underline hover:text-neutral-700/75 transition-text ease-in-out duration-100 rounded-none py-1 border-s border-neutral-200 hover:border-neutral-300 w-full text-left transition-all z-10 pl-5 text-nowrap text-ellipsis',
													step === _step &&
														'border-l border-primary-400 hover:border-primary-400 text-primary-500 hover:text-primary-500 font-medium'
												)}>
												<li>{_step.split('_').at(0)}</li>
											</Button>
										))}
									</ul>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</ol>
			</div>
		</div>
	);
}
