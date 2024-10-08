import type { FormFactoryProps } from '@/components/UIcomponents/FormFactory';
import { DATAB_FIELDS } from './brokerSpecific/databank';
import { NIGERIA_FIELDS } from './clientSpecific/nigeria';
import { RESIDENCE_FIELDS } from './misc/Residence';

const dynamicBioFields: ReadonlyMap<
	string,
	(indexer: number) => FormFactoryProps[]
> = new Map([
	['DATAB', DATAB_FIELDS],
    [ 'NG', NIGERIA_FIELDS ],
    [ 'RESIDENCE', RESIDENCE_FIELDS ]
]);


export { dynamicBioFields };
