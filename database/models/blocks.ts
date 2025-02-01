import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: "blocks",
  timestamps: true
})
export class Blocks extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    })
    id?: number;

    @Column(DataType.STRING)
    hash? : string;

    @Column(DataType.INTEGER)
    tx_count?: number | null;

  // @HasMany(() => Hobby)
  // hobbies: Hobby[];
}