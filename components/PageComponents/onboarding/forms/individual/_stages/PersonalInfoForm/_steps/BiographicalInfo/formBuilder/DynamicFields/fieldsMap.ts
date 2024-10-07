import type { FormFactoryProps } from '@/components/UIcomponents/FormFactory';
import { DATAB_FIELDS } from './brokerSpecific/DATAB';
import { NIGERIA_FIELDS } from './nationalitySpecific/Nigeria';
import { RESIDENCE_FIELDS } from './misc/Residence';

const dyanamic_bio_fields: ReadonlyMap<
	string,
	(indexer: number) => FormFactoryProps[]
> = new Map([
	['DATAB', DATAB_FIELDS],
    [ 'NG', NIGERIA_FIELDS ],
    [ 'RESIDENCE', RESIDENCE_FIELDS ]
]);


export { dyanamic_bio_fields };
