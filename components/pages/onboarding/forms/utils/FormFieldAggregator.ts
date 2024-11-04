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
				const fieldsNotToRemove = tagSpecificFieldIndices.map(
					(fieldIndex) => this._intermediateFields[fieldIndex]
				);

				this._intermediateFields = fieldsNotToRemove;
				return;
			}

			tagSpecificFieldIndices.forEach((index) => {
				this._intermediateFields[index] = {
					...this._intermediateFields[index],
					rules: {
						...this._intermediateFields[index].rules as RegisterOptions,
						...(modifierOptions.required
							? { required: 'This entry is required' }
							: { required: false }),
					},
					...(modifierOptions.fieldType && {
						fieldType: modifierOptions.fieldType,
					}),
					...(modifierOptions.readonly && { readonly: true }),
				};
			});
		}
	}

	generate = () => this._intermediateFields;
}
