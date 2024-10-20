import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from '@/components/UIcomponents/ui/sheet';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';
import type { Dispatch } from 'react';
import type { FormReducerAction } from '@/components/PageComponents/onboarding/forms/individual/utils/formReducer';

type Stage = {
	readonly name: string;
	readonly steps: readonly string[];
};

interface FormProgressSheetProps<TSteps> {
	reveal: boolean;
	formStages: readonly TSteps[];
	formAction: Dispatch<FormReducerAction>;
	stageIndex: number;
	stepIndex: number;
}

export default function FormProgressSheet<T extends Stage>({
	reveal,
	formStages,
	formAction,
	stageIndex,
	stepIndex,
}: FormProgressSheetProps<T>) {
	const dispatch = useState(formStages[stageIndex].name);

	const progress = useRef(new Set<string>());

	progress.current.add(formStages[stageIndex].name);
	progress.current.add(formStages[stageIndex].steps[stepIndex]);

	useEffect(() => {
		dispatch[1](formStages[stageIndex].name);
	}, [stageIndex, formStages, dispatch]);

	return (
		<Sheet
			modal={false}
			open={reveal}>
			<SheetContent
				side={'left'}
				onInteractOutside={(e) => e.preventDefault()}
				onEscapeKeyDown={(e) => e.preventDefault()}
				onOpenAutoFocus={(e) => e.preventDefault()}
				className='py-10 px-0 border-none'>
				<SheetHeader>
					<SheetTitle></SheetTitle>
					<SheetDescription></SheetDescription>
				</SheetHeader>
				<div className='py-8 w-full px-5'>
                    <ul className='font-normal text-neutral-700/95 list-inside overflow-auto max-h-[40rem]' style={ {
                        scrollbarWidth: 'thin'
                    }}>
						<Accordion
							type={'single'}
							collapsible
							value={formStages[stageIndex].name}
							onValueChange={dispatch[1]}>
							{formStages.map((stage, i) => (
								<AccordionItem
									key={stage.name}
									value={stage.name}
									className={cn(
										'w-full outline-none focus-visible:outline-none focus-visible-ring-none hover:no-underline border-none bg-transparent py-0 h-fit border-none'
									)}>
									<AccordionTrigger
										onClick={() => {
											if (i === stageIndex) return;
											formAction({
												type: 'jump_to_form_location',
												toStage: i,
												toStep: 0,
											});
										}}
										disabled={!progress.current.has(stage.name)}
										className='border-none data-[state=closed]:rounded-none data-[state=open]:rounded-none bg-transparent px-5 leading-relaxed font-medium text-sm text-neutral-800 capitalize'>
										<li>{stage.name}</li>
									</AccordionTrigger>
									<AccordionContent className={'py-0 border-none'}>
										<ol className='relative list-inside h-fit space-y-2'>
											<div className='absolute h-full border-neutral-100 border-l  -z-10'></div>
											{stage.steps.map((step, j) => (
												<Button
													key={step}
													variant={'link'}
													disabled={!progress.current.has(stage.steps[j])}
													onClick={() =>
														formAction({
															type: 'jump_to_form_location',
															toStage: i,
															toStep: j,
														})
													}
													size={'sm'}
													className={cn(
														'text-sm capitalize h-fit py-0 font-normal text-neutral-700 block hover:no-underline hover:text-neutral-700/75 transition-text ease-in-out duration-100 rounded-none py-1 border-s border-neutral-100 hover:border-neutral-300 w-full text-left transition-all',
														j === stepIndex &&
															i === stageIndex &&
															'border-l border-primary-400 hover:border-primary-400 text-primary-500 hover:text-primary-500 font-medium'
													)}>
													<li>{step.split('_').at(0)}</li>
												</Button>
											))}
										</ol>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</ul>
				</div>
			</SheetContent>
		</Sheet>
	);
}

// className={cn(
//     'px-8 w-full outline-none justify-start focus-visible:outline-none py-8 focus-visible-ring-none hover:no-underline heading1Regular',
//     stageIndex === i &&
//         'bg-neutral-100 text-neutral-500 rounded-none hover:bg-neutral-100 shadow-inner'
// )}>/
