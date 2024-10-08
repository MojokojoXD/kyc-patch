import type { FormFactoryProps } from '@/components/UIcomponents/FormFactory';
import { employedFields } from './clientSpecific/employed';
import { studentFields } from './clientSpecific/student';

const dynamicEmploymentMap: ReadonlyMap<
	string,
	(indexer: number) => FormFactoryProps[]
> = new Map([
	['student', studentFields],
	['employed', employedFields],
]);

export default dynamicEmploymentMap;
