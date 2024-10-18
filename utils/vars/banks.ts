import type { BankList } from "@/types/forms/universal";
import rawbankList from '@/utils/vars/_formDefaults/banks.json';

const getBankList = async(): Promise<BankList[]> => rawbankList.data;

export { getBankList }