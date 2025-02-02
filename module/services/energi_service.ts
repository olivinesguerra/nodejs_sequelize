import { EnergiRepository } from "../repository";

export const getTxInfo = async (txHash: string) => {
    const res = await EnergiRepository.getTxInfo(txHash);
    return res?.data?.result;
};