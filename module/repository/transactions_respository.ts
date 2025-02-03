
import { Transaction } from "../../database/models";
import { FindOptions, fn, col, cast } from "sequelize";

export const create = async (data: any) => {
    return await Transaction.create(data);
};

export const getAll = async (offset?: number, limit?: number) => {
    const query: FindOptions = { where: { } };

    if (limit) {
        query.limit = limit;
    }

    if (offset) {
        query.offset = offset;
    }
    
    // query.order = ["createdAt", "ASC"];

    return await Transaction.findAll(query);
};

export const getSum = async () => {
    return await Transaction.findAll({
        attributes: [[cast(fn('SUM', col('gasPrice')), 'integer'), 'totalAssetAmount']],
    });
}