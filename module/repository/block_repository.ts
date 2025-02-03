import { FindOptions } from "sequelize";
import { Block, Transaction } from "../../database/models";

export const create = async (data: any) => {
    return await Block.create(data);
};

export const getAll = async (include: boolean = false, offset?: number, limit?: number) => {
    const query: FindOptions = { where: { } };

    if (include) {
        query.include = [
            { model: Transaction, separate: true }
        ];
    }

    if (limit) {
        query.limit = limit;
    }

    if (offset) {
        query.offset = offset;
    }

    query.order = ["createdAt", "ASC"];

    return await Block.findAll(query);
}

export const findById = async (id: string, include: boolean = false) => {
    const query: FindOptions = { where: { blockNumber: id } };

    if (include) {
        query.include = [
            { model: Transaction, separate: true }
        ];
    }

    return await Block.findOne(query);
};

export const upsert = async (data: any) => {
    const [instance, created] = await Block.upsert(data);
    return { instance, created }
};
