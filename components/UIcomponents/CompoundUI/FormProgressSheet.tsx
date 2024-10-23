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
import type {
	FormAction,
	Stage,
	Step,
} from '@/components/PageComponents/onboarding/forms/individual/utils/formReducer';

type ProgressStage = {
	readonly name: string;
	readonly steps: readonly string[];
};

interface FormProgressSheetProps<TSteps> {
	formStages: readonly TSteps[];
	formAction: FormAction;
	stage: Stage;
	step: Step;
}

export default function FormProgressSheet<T extends ProgressStage>({
	formStages,
	formAction,
	stage,
	step,
}: FormProgressSheetProps<T>) {
	const [currentStage, setCurrentStage] = useState<string>(stage);

	const progress = useRef(new Set<string>());

	progress.current.add(stage);
	progress.current.add(step);

	useEffect(() => {
		setCurrentStage(stage);
	}, [stage, setCurrentStage]);

	return (
		<Sheet
			modal={false}
			open={true}>
			<SheetContent
				side={'left'}
				onInteractOutside={(e) => e.preventDefault()}
				onEscapeKeyDown={(e) => e.preventDefault()}
				onOpenAutoFocus={(e) => e.preventDefault()}
				className='py-10 px-0 border-none'>
				<div className='hidden'>
					<SheetHeader>
						<SheetTitle></SheetTitle>
						<SheetDescription></SheetDescription>
					</SheetHeader>
				</div>
				<div className='py-8 w-full px-5'>
					<ul
						className='font-normal text-neutral-700/95 list-inside overflow-auto max-h-[40rem]'
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
											formAction({
												type: 'jump_to_form_location',
												toStage: _stage.name as Stage,
											});
										}}
										disabled={!progress.current.has(_stage.name)}
										className='border-none data-[state=closed]:rounded-none data-[state=open]:rounded-none bg-transparent px-5 leading-relaxed font-medium text-sm text-neutral-800 capitalize'>
										<li>{_stage.name}</li>
									</AccordionTrigger>
									<AccordionContent className={'py-0 border-none'}>
										<ol className='relative list-inside h-fit space-y-2'>
											<div className='absolute h-full border-neutral-100 border-l  -z-10'></div>
											{_stage.steps.map((_step) => (
												<Button
													key={_step}
													variant={'link'}
													disabled={!progress.current.has(_step)}
													onClick={() =>
														formAction({
															type: 'jump_to_form_location',
															toStage: _stage.name as Stage,
															toStep: _step as Step,
														})
													}
													size={'sm'}
													className={cn(
														'text-sm capitalize h-fit py-0 font-normal text-neutral-700 block hover:no-underline hover:text-neutral-700/75 transition-text ease-in-out duration-100 rounded-none py-1 border-s border-neutral-100 hover:border-neutral-300 w-full text-left transition-all',
														step === _step &&
															'border-l border-primary-400 hover:border-primary-400 text-primary-500 hover:text-primary-500 font-medium'
													)}>
													<li>{_step.split('_').at(0)}</li>
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
