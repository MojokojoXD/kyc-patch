
export interface ReviewStepMetadata<TFormSteps>
{
    step: TFormSteps;
    header: string;
    _maxFieldIndex?: number;
    field: {
        id: number;
        name: string;
        path: string | ( ( index: number ) => string[] | string );
        fieldType?: string;
    }[]
}