import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/sequelize";
import { FrProduct } from "@models/billsoftadmin/selling-product/allocate-product-model";

// Define SubCategory attributes
interface SubCategoryAttributes {
  id?: number; // Set as optional
  CatId: number;
  Name?: string | null;
  Photo?: string | null;
  Status: number;
  FrId: number;
  ProdType: number;
  CreatedBy: number;
  CreatedDate?: Date | null;
  ModifiedBy: number;
  ModifiedDate?: Date | null;
}

// Define a type for creation attributes (exclude `id` so the DB generates it)
interface SubCategoryCreationAttributes extends Optional<SubCategoryAttributes, "id"> {}

// Define the Sequelize model class
export class SubCategory
  extends Model<SubCategoryAttributes, SubCategoryCreationAttributes>
  implements SubCategoryAttributes {
  public id!: number;
  public CatId!: number;
  public Name?: string | null;
  public Photo?: string | null;
  public Status!: number;
  public FrId!: number;
  public ProdType!: number;
  public CreatedBy!: number;
  public CreatedDate?: Date | null;
  public ModifiedBy!: number;
  public ModifiedDate?: Date | null;
}

// Initialize the model
SubCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // ✅ Ensure Sequelize treats it as auto-increment
      primaryKey: true,
    },
    CatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    FrId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProdType: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "0: custcat; 1: rawcat;",
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CreatedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ModifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ModifiedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "tbl_cust_sub_category_2025",
    timestamps: false,
  }
);

// Function to define associations after all models are imported
export const associateSubCategory = () => {
  const { FrProduct } = require("../../../models/billsoftadmin/selling-product/allocate-product-model"); // Lazy Import
  SubCategory.hasMany(FrProduct, { foreignKey: "SubCatId", as: "Products" });
};
// Exporting the model
export { SubCategoryAttributes, SubCategoryCreationAttributes };
