import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt , DataType } from 'sequelize-typescript';

@Table({
    tableName: "transactions",
    timestamps: true
})
export class Transaction extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    })
    id?: number;


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

}