import type { BankList } from "@/types/forms/universal";
import rawbankList = require( '@/utils/vars/_formDefaults/banks.json' );

const getBankList = (): Promise<BankList[]> => rawbankList.data;

export { getBankList }