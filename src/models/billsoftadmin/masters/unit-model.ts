import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/sequelize";

// Define Unit attributes
export interface UnitAttributes {
    id: number;
    Name?: string | null;
    Name2?: string | null;
    Status: number;
    roll: number;
}

export interface UnitCreationAttributes extends Optional<UnitAttributes, 'id'> {}

// Define the Unit model
class Unit extends Model<UnitAttributes, UnitCreationAttributes> implements UnitAttributes {
    public id!: number;
    public Name?: string | null;
    public Name2?: string | null;
    public Status!: number;
    public roll!: number;
}

// Initialize the model
Unit.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        Name2: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        Status: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 1,
        },
        roll: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "tbl_units_2025",
        timestamps: false,
    }
);

export { Unit };