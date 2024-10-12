import type { FormFactoryProps } from '@/types/Components/formFactory';
import { KESTREL_CONTACT_FIELDS } from './brokerSpecific/kestrel';
import { GHANA_RESIDENCE_FIELDS } from './clientSpecific/ghanaResidence';

const dynamicContactFields: ReadonlyMap<
	string,
	(indexer: number) => FormFactoryProps[]
> = new Map([
	['KESTR', KESTREL_CONTACT_FIELDS],
	['GH', GHANA_RESIDENCE_FIELDS],
]);

export { dynamicContactFields };
