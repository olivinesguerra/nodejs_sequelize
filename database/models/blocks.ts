import { Table, Column, Model, DataType, HasMany, ForeignKey } from 'sequelize-typescript';
import { Transaction } from "./transactions"

@Table({
  tableName: "blocks",
  timestamps: true
})
export class Block extends Model {

    @Column({
        type:DataType.UUID,
        primaryKey: true,
        field: "id"
    })
    id?: string;

    @Column(DataType.STRING)
    hash? : string;

    @Column(DataType.INTEGER)
    tx_count?: number | null;

    @HasMany(() => Transaction, "block_id")
    transactions?: Transaction[];
}