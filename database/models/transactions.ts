import { Table, Column, Model, NotNull, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Block } from "./blocks"

@Table({
    tableName: "transactions",
    timestamps: true
})
export class Transaction extends Model {

    @Column({
        type: DataType.UUID,
        primaryKey: true,
        field: "id"
    })
    id?: string;
    
    @ForeignKey(() => Block)
    @Column(DataType.UUID)
    block_id? : string;

    @Column(DataType.STRING)
    hash? : string;

    @Column(DataType.STRING)
    from?: string | null;

    @Column(DataType.STRING)
    to?: string | null;

    @Column(DataType.INTEGER)
    amount?: number | null;

    @Column(DataType.INTEGER)
    nonce?: number | null;

    @BelongsTo(() => Block)
    block?: Block;


}