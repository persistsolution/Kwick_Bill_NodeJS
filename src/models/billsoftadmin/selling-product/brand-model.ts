import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/sequelize";

// Define Brand attributes
export interface BrandAttributes {
    id: number;
    name?: string | null;
    srno: number;
    status: boolean;
    createdby: number;
    createddate?: Date | null;
    modifiedby: number;
    modifieddate?: Date | null;
}

export interface BrandCreationAttributes extends Optional<BrandAttributes, 'id'> { }

// Define the Brand model
class Brand extends Model<BrandAttributes, BrandCreationAttributes> implements BrandAttributes {
    public id!: number;
    public name?: string | null;
    public srno!: number;
    public status!: boolean;
    public createdby!: number;
    public createddate?: Date | null;
    public modifiedby!: number;
    public modifieddate?: Date | null;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model
Brand.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        srno: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1,
        },
        createdby: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createddate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        modifiedby: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        modifieddate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "tbl_brands",
        timestamps: false,
    }
);

export { Brand }; // Export separately
