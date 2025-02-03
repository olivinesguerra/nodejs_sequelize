import { Table, Column, Model, DataType, HasMany, ForeignKey } from 'sequelize-typescript';
import { Transaction } from "./transactions"
import {
  literal
} from "sequelize";

@Table({
  tableName: "blocks",
  timestamps: true
})
export class Block extends Model {

    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4
    })
    id?: string;
    
    @Column(DataType.STRING)
    blockNumber? : string;

    @Column(DataType.STRING)
    hash? : string;

    @Column(DataType.INTEGER)
    txcount?: number | null;

    @HasMany(() => Transaction, "blockNumber")
    transactions?: Transaction[];
}