import { Context } from "moleculer";
import { TransactionRepository } from "../repository";
import {
    GetListBlockParams,
 } from "../../module/util/typings";

export const getTxInfo = async (txHash: string) => {
    return null;
};

export const getTransactions = async(ctx: Context<GetListBlockParams>) => {
    return await TransactionRepository.getAll();
};

export const getSum = async () => {
    return await TransactionRepository.getSum();
};