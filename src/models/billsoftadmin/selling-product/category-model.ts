import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/sequelize";
import { FrProduct } from "@models/billsoftadmin/selling-product/allocate-product-model"; // Import Category Model

// Define Category attributes
export interface CategoryAttributes {
  id: number;
  Name: string;
  Icon?: string | null;
  Photo?: string | null;
  Photo2?: string | null;
  Featured: number;
  ProdType: number;
  Status: number;
  srno: number;
  CreatedDate: Date;
  ModifiedDate?: Date | null;
  Roll: number;
  CreatedBy: number;
  ModifiedBy: number;
  push_flag: boolean;
  delete_flag: boolean;
  modified_time?: Date | null;
//   s3Key?: string | null;
}

export interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id"> {}

// Define the Category model
class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number;
  public Name!: string;
  public Icon?: string | null;
  public Photo?: string | null;
  public Photo2?: string | null;
  public Featured!: number;
  public ProdType!: number;
  public Status!: number;
  public srno!: number;
  public CreatedDate!: Date;
  public ModifiedDate?: Date | null;
  public Roll!: number;
  public CreatedBy!: number;
  public ModifiedBy!: number;
  public push_flag!: boolean;
  public delete_flag!: boolean;
  public modified_time?: Date | null;
//   public s3Key?: string | null;
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Icon: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Photo: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Photo2: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Featured: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    ProdType: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    srno: {
      type: DataTypes.FLOAT(14, 1),
      allowNull: false,
    },
    CreatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ModifiedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Roll: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ModifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    push_flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    delete_flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    modified_time: {
      type: DataTypes.DATE(3),
      allowNull: true,
    },
    // s3Key: {
    //   type: DataTypes.STRING(100),
    //   allowNull: true,
    // },
  },
  {
    sequelize,
    tableName: "tbl_cust_category_2025",
    timestamps: false,
  }
);

// Function to define associations after all models are imported
export const associateCategory = () => {
  const {
    FrProduct,
  } = require("../../../models/billsoftadmin/selling-product/allocate-product-model"); // Lazy Import
  Category.hasMany(FrProduct, { foreignKey: "CatId", as: "Products" });
};

export { Category }; // Export separately
