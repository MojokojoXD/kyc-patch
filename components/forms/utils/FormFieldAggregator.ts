import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { FactoryFieldType } from '@/types/Components/formFactory';
import type { Tag } from '@/types/Components/formFactory';
import type { RegisterOptions } from 'react-hook-form';

type ModifierOptions = {
	required: boolean;
	fieldType: FactoryFieldType;
	remove: boolean;
	removeAllExcept: boolean;
	readonly: boolean;
};

type ModifierFormFactoryProps = Omit<FormFactoryProps, 'tags'>;

export class FormFieldAggregator {
	private _intermediateFields: FormFactoryProps[] = [];

	constructor(fields: FormFactoryProps[]) {
		this._intermediateFields = [...fields];
	}

	modifyFields(
		fieldName: string,
		modifier: (
			field: FormFactoryProps
		) => Partial<ModifierFormFactoryProps> | null | undefined
	): void;
	modifyFields(tagName: Tag, modifier: Partial<ModifierOptions>): void;
	modifyFields(fieldNameOrTag: string | Tag, modifier: object) {
		if (typeof modifier === 'function') {
			const fieldIndex = this._intermediateFields.findIndex(
				(f) => f.name === fieldNameOrTag
			);

			if (fieldIndex === -1) return;

			const currentField = this._intermediateFields[fieldIndex];

			const config: Partial<ModifierFormFactoryProps> | null | undefined =
				modifier(currentField);

			if (!config) return;

			this._intermediateFields[fieldIndex] = {
				...currentField,
				...config,
			};
		} else {
			const modifierOptions: ModifierOptions = {
				...(modifier as ModifierOptions),
			};

			let tagSpecificFieldIndices: number[] = [];

			//Aggregate field indices that need to modified, if the tag parameter is provide or else world on all fields if no tag parameter is provided.
			if (fieldNameOrTag === '') {
				tagSpecificFieldIndices = [...this._intermediateFields.keys()];
			} else {
				this._intermediateFields.forEach((f, i) => {
					if (f.tags && f.tags.includes(fieldNameOrTag as Tag)) {
						tagSpecificFieldIndices.push(i);
					}
				});
			}

			if (tagSpecificFieldIndices.length === 0) return;

			if (modifierOptions.remove) {
				this._intermediateFields = this._intermediateFields.filter(
					(_, i) => !tagSpecificFieldIndices.includes(i)
				);
				return;
			}

			if (modifierOptions.removeAllExcept) {
				this._intermediateFields = tagSpecificFieldIndices.map(
					(fieldIndex) => this._intermediateFields[fieldIndex]
				);

				
				return;
			}

			/*
        Beyond this we modify the properties on the field themselves;  
      */
      
      // if ( !modifierOptions.fieldType || !modifierOptions.readonly || !modifierOptions.required ) return;

			tagSpecificFieldIndices.forEach((index) => {
				const fieldToModify = this._intermediateFields[index];

        this._intermediateFields[ index ] = {
          //destructure all default value
          ...fieldToModify,
          
          //Override specific properties based on configuration
          //--label-override
          ...( typeof modifierOptions.required !== 'undefined' && { label: modifierOptions.required ? this.removeOptionalOnLabel( fieldToModify.label ) : this.addOptionalToLabel( fieldToModify.label ) } ),
          
          //--rules-override
					rules: {
						...(fieldToModify.rules as RegisterOptions),
						...(modifierOptions.required
							? { required: 'This entry is required' }
							: { required: false }),
          },
          //--field type override
					...(modifierOptions.fieldType && {
						fieldType: modifierOptions.fieldType,
          } ),
          //--readonly-override
					...(modifierOptions.readonly && { readonly: true }),
				};
			});
		}
	}

	generate = () => this._intermediateFields;

	private addOptionalToLabel = (label: string) => label + ' (Optional)';
	private removeOptionalOnLabel = (label: string) => {
		const sliceEndIndex = label.indexOf('(Optional)');

		return sliceEndIndex >= 0 ? label.slice(0, sliceEndIndex - 1) : label;
	};
}
