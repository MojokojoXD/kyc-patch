import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/UIcomponents/ui/accordion';
import { FormHelpers } from '@/utils/clientActions/formHelpers';
import { SignatureProcessor } from '@/utils/clientActions/signatureHelpers';
import { Button } from '@/components/UIcomponents/ui/button';
import { FilePenLine } from 'lucide-react';
import { ReactNode, Fragment, useEffect, useState } from 'react';
import Image from 'next/image';

interface ReviewBlockProps {
	children: ReactNode;
}


type PossibleFormEntryTypes = (string | number | boolean | string[] | undefined)[] 


export function ReviewBlock({ children }: ReviewBlockProps) {
	return (
		<div className='space-y-5 p-10 bg-white border-neutral-200'>{children}</div>
	);
}

type ReviewHeaderProps<TFormSteps> = {
	title: string;
	editCallBack: (forceStep?: TFormSteps, returnStep?: TFormSteps) => void;
};

export function ReviewHeader<TFormSteps>({
	title,
	editCallBack,
}: ReviewHeaderProps<TFormSteps>) {
	return (
		<div className='flex justify-between'>
			<div>
				<h2 className='text-xl capitalize max-w-lg'>{title}</h2>
			</div>
			<div>
				<Button
					size={'sm'}
					variant={'ghost'}
					className='text-primary-500 font-normal text-base hover:bg-transparent'
					type='button'
					onClick={() => editCallBack()}>
					<FilePenLine className='w-4 h-4 mr-1' />
					Edit
				</Button>
			</div>
		</div>
	);
}

type ReviewContentProps<TFormData> = {
	index?: number;
	triggerLabel: string;
	fields: {
		id: number;
		name: string;
		path: string | ((index: number) => string | string[]);
		fieldType?: string;
	}[];
	formData: TFormData;
};

export function ReviewContent<TFormData>({
	triggerLabel,
	fields,
	formData,
	index = 0,
}: ReviewContentProps<TFormData>) {
	return (
		<div>
			<Accordion
				type='single'
				collapsible
				defaultValue={triggerLabel}>
				<AccordionItem value={triggerLabel}>
					<AccordionTrigger className='capitalize text-lg'>
						<p>
							<span className='mr-5'>Applicant #{index + 1}:</span>
							{triggerLabel}
						</p>
					</AccordionTrigger>
					<AccordionContent className='space-y-5'>
						{fields.map((f) => {
							let fieldValues: PossibleFormEntryTypes = [];

							if (typeof f.path === 'function') {
								const temp = f.path(index);
								fieldValues = Array.isArray(temp)
									? temp.map((p) =>
											FormHelpers.recursiveFormSearch(p, formData)
									  )
									: [FormHelpers.recursiveFormSearch(temp, formData)];
							} else {
								fieldValues = [
									FormHelpers.recursiveFormSearch(f.path, formData),
								];
							}

							fieldValues = fieldValues.filter(Boolean);

							if (fieldValues.length === 0) return null;

							if (f.fieldType === 'image') {
								return (
									<ImageFieldReviewer
										key={f.id}
										value={fieldValues}
										name={f.name}
									/>
								);
                            }
                            
                            if ( f.fieldType === 'boolean' )
                            {
                                return (
                                    <BooleanFieldReviewer
                                        key={ f.id }
                                        value={ fieldValues }
                                        name={f.name}
                                    />
                                )
                            }

							return (
								<div
									className='space-y-3'
									key={f.id}>
									<h3 className='text-base font-medium capitalize text-neutral-700'>
										{f.name}
									</h3>
									<p className='font-normal text-base text-neutral-500'>
										{fieldValues.map((v, i) =>
											Array.isArray(v) ? (
												v.map((sv) => (
													<Fragment key={sv}>
														<span className='block'>{sv}</span>
														{i < fieldValues.length - 1 && <br />}
													</Fragment>
												))
											) : (
												<Fragment key={`${f.name}_${typeof v === 'boolean' ? v.toString() : v}`}>
													<span>{v}</span>
													{i < fieldValues.length - 1 && ' - '}
												</Fragment>
											)
										)}
									</p>
								</div>
							);
						})}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}

function ImageFieldReviewer({
	value,
	name,
}: {
	value: PossibleFormEntryTypes;
	name: string;
    } )
{
    const [ isLoading, setIsLoading ] = useState<boolean>( true );
    const [ imageURL, setImageURL ] = useState<string>( "" );
    
    useEffect( () =>
    {

        const downloadImg = async ( fileName: string ) =>
        {
            const imgURL = await SignatureProcessor.download( fileName );

            if ( imgURL )
            {
                setImageURL( imgURL );
            }

            setIsLoading( false );
        }

        if ( value )
        {
            downloadImg( value.at( 0 ) as string );
        }
        
    }, [ value ])
	return (
		<div className='space-y-3'>
			<h3 className='text-base font-medium capitalize text-neutral-700'>
				{name}
			</h3>
			<div className='relative h-[130px] w-2/5'>
				{ !isLoading ? (
					<Image
						src={imageURL}
						fill
						className='object-cover'
						alt={`${name} review image`}
					/>
				) : (
					'loading...'
				)}
			</div>
		</div>
	);
}

function BooleanFieldReviewer({
	name,
	value,
}: {
	name: string;
	value: PossibleFormEntryTypes;
}) {
	return (
		<div className='space-y-3'>
			<h3 className='text-base font-medium capitalize text-neutral-700'>
				{name}
			</h3>
			<p className='font-normal text-base text-neutral-500'>
				{value[0] === 'true' ? 'Agree' : 'Not Agreed'}
			</p>
		</div>
	);
}
