import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

@Table({tableName:"users"})
export class User extends Model<InferCreationAttributes<User>, InferAttributes<User>> {
    @Column({ autoIncrement: true, primaryKey: true })
    id: number;

    @Column
    name: string;

    @Column
    gender: string

    @Column
    email: string;

    @Column
    password: string;

    @Column
    mobile: number;

    @Column
    deleted_at: Date;

    @Column({ defaultValue: false })
    is_deleted: boolean;

}
