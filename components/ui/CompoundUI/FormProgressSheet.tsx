import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { CustomProgress } from './CustomProgress';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { useKYCFormContext } from '@/components/forms/utils/formController';

export default function FormProgressSheet()
{
  const { formNav, goToFormLocation } = useKYCFormContext();

	const progressStep = useRef(new Set<string>());
	const progressStage = useRef(new Set<string>());

	progressStage.current.add(formNav.currentStage);
	progressStep.current.add(formNav.currentStep);

	const maxNumberOfSteps = formNav.allStages.reduce((a, c) => a + c.steps.length, 0);

	useEffect(() => {
		const stepElement = document.getElementById(formNav.currentStep);
		stepElement?.scrollIntoView();
	}, [formNav.currentStep]);

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
						value={formNav.currentStage}
						onValueChange={( v ) => goToFormLocation(v)}>
						{formNav.allStages.map((_stage) => (
							<AccordionItem
								key={_stage.name}
								value={_stage.name}
								className={cn(
									'w-full outline-none focus-visible:outline-none focus-visible-ring-none hover:no-underline border-none bg-transparent py-0 h-fit border-none'
								)}>
								<AccordionTrigger
									onClick={() => {
										if (_stage.name === formNav.currentStage) return;
										goToFormLocation(_stage.name);
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
													goToFormLocation(_stage.name,_step)
												}
												size={'sm'}
												className={cn(
													'relative text-sm capitalize h-fit py-0 font-normal text-neutral-700 block hover:no-underline hover:text-neutral-700/75 transition-text ease-in-out duration-100 rounded-none py-1 border-s border-neutral-200 hover:border-neutral-300 w-full text-left transition-all z-10 pl-5 text-nowrap text-ellipsis',
													formNav.currentStep === _step &&
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
