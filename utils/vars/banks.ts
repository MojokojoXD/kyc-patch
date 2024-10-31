import type { BankList } from '@/types/forms/common';
import rawbankList from '@/utils/vars/_formDefaults/banks.json';

const getBankList = async (): Promise<BankList[]> => rawbankList.data;

export { getBankList };
