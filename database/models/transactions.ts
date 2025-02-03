import { 
    Table, 
    Column, 
    Model, 
    DataType, 
    BelongsTo, 
    ForeignKey,
} from 'sequelize-typescript';
import {
    literal
} from "sequelize";
import { Block } from "./blocks"

@Table({
    tableName: "transactions",
    timestamps: true
})
export class Transaction extends Model {

    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4
    })
    id?: string;
    
    @ForeignKey(() => Block)
    @Column(DataType.UUID)
    blockNumber? : string | null;

    @Column(DataType.STRING)
    hash? : string | null;

    @Column(DataType.STRING)
    input? : string  | null;

    @Column(DataType.STRING)
    timeStamp? : string;

    @Column(DataType.STRING)
    from?: string | null;

    @Column(DataType.STRING)
    to?: string | null;

    @BelongsTo(() => Block)
    block?: Block;

    @Column(DataType.STRING)
    gasPrice?: string | null;

    @Column(DataType.STRING)
    gasLimit?: string | null;

    @Column(DataType.STRING)
    gasUsed?: string | null;

    @Column(DataType.STRING)
    confirmations?: string | null;

    @Column(DataType.STRING)
    revertReason?: string | null;
}