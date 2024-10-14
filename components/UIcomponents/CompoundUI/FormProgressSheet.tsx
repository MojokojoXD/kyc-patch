import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from '@/components/UIcomponents/ui/sheet';
import {
	Accordion,
	// AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion';
// import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useState,useEffect } from 'react';

type Stage = {
	name: string;
	steps: string[];
};

interface FormProgressSheetProps<TSteps> {
	reveal: boolean;
	formStages: TSteps[];
	formAction: (stage: number, step: number) => void;
	stageIndex: number;
}

export default function FormProgressSheet<T extends Stage>({
	reveal,
	formStages,
	formAction,
	stageIndex,
}: FormProgressSheetProps<T> )
{
    const [ currentStage, setCurrentStage ] = useState( stageIndex );

    useEffect( () =>
    {   
        setCurrentStage( stageIndex );
        
    },[ stageIndex ])

	return (
		<Sheet
			modal={false}
			open={reveal}>
			<SheetContent
				side={'left'}
				onInteractOutside={(e) => e.preventDefault()}
				onEscapeKeyDown={(e) => e.preventDefault()}
				onOpenAutoFocus={(e) => e.preventDefault()}
				className='py-20 px-0'>
				<SheetHeader className='px-14'>
					<SheetTitle></SheetTitle>
					<SheetDescription></SheetDescription>
				</SheetHeader>
				<div className='py-8 w-full'>
					<ul className='list-disc font-normal text-neutral-700/95 list-inside'>
						<Accordion type={'single'} collapsible>
							{formStages.map((stage, i) => (
								<AccordionItem
									key={stage.name}
                                    value={ stage.name }
                                    className={cn(
                                        'w-full outline-none focus-visible:outline-none focus-visible-ring-none hover:no-underline heading1Regular border-none bg-transparent py-0 h-fit',
                                        currentStage === i &&
                                            'bg-neutral-100 text-neutral-500 hover:bg-neutral-100 shadow-inner'
                                    )}
                                >
									<AccordionTrigger
                                        onClick={ formAction.bind( this, i, 0 ) }
                                        className='border-none data-[state=closed]:rounded-none data-[state=open]:rounded-none bg-transparent font-medium px-5'
										>
										<li>{stage.name}</li>
									</AccordionTrigger>
									{/* <AccordionContent className='data-[state=closed]:hidden ring py-0' forceMount>
										<ol className='list-[upper-roman] list-inside'>
											{formStages[currentStage].steps.map((step, i) => (
												<Button
                                                    key={ step }
                                                    variant={ 'link' }
                                                    size={ 'sm' }
                                                    className='text-sm capitalize h-fit py-1.5 text-[14px] font-normal'
													onClick={formAction.bind(this, currentStage, i)}>
													<li>{step}</li>
												</Button>
											))}
										</ol>
									</AccordionContent> */}
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
