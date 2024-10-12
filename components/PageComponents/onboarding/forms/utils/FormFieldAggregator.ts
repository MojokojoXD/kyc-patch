import type { FormFactoryProps } from '@/types/Components/formFactory';
import type { BrokerCode } from '@/types/forms/broker';
import type { FactoryFieldType } from '@/types/Components/formFactory';
import type { Tag } from '@/types/Components/formFactory';

type FormFields =
	| FormFactoryProps[]
	| ((modifier: { [index: string]: unknown }) => FormFactoryProps[]);

type AggregatorOptions = {
	includeFieldNames: boolean;
};

type ModifierOptions = {
	required: boolean;
	fieldType: FactoryFieldType;
	remove: boolean;
	removeAllExcept: boolean;
};

type ModifierFormFactoryProps = Omit<FormFactoryProps, 'tags'>;

export class FormFieldAggregator {
	private _rawFormFields: FormFields;
	private _intermediateFields: FormFactoryProps[] = [];
	private _originatingBroker: BrokerCode;
	private _options: AggregatorOptions = {};

	constructor(
		fields: FormFields,
		options: AggregatorOptions = { includeFieldNames: true }
	) {
		this._rawFormFields = fields;

		this._options = Object.assign(this._options, options);
	}

	init(broker: BrokerCode, modifiers: { [index: string]: unknown }) {
		this._originatingBroker = broker;

		if (Array.isArray(this._rawFormFields)) {
			this._intermediateFields = this._rawFormFields;
			this._intermediateFields = this.formFieldFilter();
			return this;
		}

		this._intermediateFields = this._rawFormFields({ ...modifiers });
		this._intermediateFields = this.formFieldFilter();
		return this;
	}

	modifyFields(
		fieldName: string,
		modifier: (
			field: FormFactoryProps
		) => Partial<ModifierFormFactoryProps> | null | undefined
	): void;
	modifyFields(
		tagName: Exclude<Tag, BrokerCode>,
		modifier: Partial<ModifierOptions>
	): void;
	modifyFields(
		fieldNameOrTag: Exclude<Tag, BrokerCode>,
		modifier: object
	) {
		if (typeof modifier === 'function') {
			const fieldIndex = this._intermediateFields.findIndex(
				(f) => f.name === fieldNameOrTag
			);

			if (fieldIndex === -1) return;

			const currentField = this._intermediateFields[fieldIndex];

			const config:
				| Partial<ModifierFormFactoryProps>
				| null
				| undefined = modifier(currentField);

			if (!config) return;

			this._intermediateFields[fieldIndex] = {
				...currentField,
				...config,
			};
		} else {
			const modifierOptions: ModifierOptions = { ...modifier };

			let tagSpecificFieldIndices: number[] = [];

			if (fieldNameOrTag === '') {
				tagSpecificFieldIndices = [...this._intermediateFields.keys()];
			} else {
				this._intermediateFields.forEach((f, i) => {
					if (f.tags && f.tags.includes(fieldNameOrTag)) {
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
						...this._intermediateFields[index].rules,
						...(modifierOptions.required
							? { required: 'This entry is required' }
							: { required: false }),
					},
					...(modifierOptions.fieldType && {
						fieldType: config.fieldType,
					}),
				};
			});
		}
	}

	generate = () => ({
		fields: this._intermediateFields,
		...(this._options.includeFieldNames && {
			fieldNames: this.getFieldNames() as const,
		}),
	});

	private getFieldNames() {
		const fieldNames: ReadonlyArray<string> =
			this._intermediateFields.map((o) => {
				if (o.name) return o.name as const;

				throw new Error(
					'A field is missing the name property, make sure all fields have unique names'
				);
			});

		return fieldNames as const;
	}

	private formFieldFilter() {
		this._intermediateFields.forEach((f) => {
			if (f.filter && f.filter.behavior) {
				console.log(f.filter.behavior());
			}
		});

		return this._intermediateFields.filter((f) => {
			return (
				!Object.hasOwn(f, 'tags') ||
				(f.tags && f.tags.includes(this._originatingBroker))
			);
		});
	}
}
