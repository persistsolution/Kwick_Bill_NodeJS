import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/sequelize";

// Define GodownStock attributes
export interface GodownStockAttributes {
  id: number;
  InvId: number;
  GodownId: number;
  FranchiseId: number;
  ProdId?: number | null;
  Qty?: string | null;
  Unit?: string | null;
  StockDate?: Date | null;
  Narration?: string | null;
  Status?: string | null;
  CreatedBy: number;
  CreatedDate?: Date | null;
  ModifiedBy: number;
  ModifiedDate?: Date | null;
  UserId: number;
  TransferId: number;
  Price?: number | null;
  TotalPrice?: number | null;
  CgstPer?: string | null;
  SgstPer?: string | null;
  IgstPer?: string | null;
  CgstAmt?: number | null;
  SgstAmt?: number | null;
  IgstAmt?: number | null;
  GstAmt?: number | null;
  OwnShop: number;
  RetailerId: number;
}

// For creation, the 'id' is optional since it auto-increments
export interface GodownStockCreationAttributes
  extends Optional<GodownStockAttributes, "id"> {}

// Define the GodownStock model
class GodownStock
  extends Model<GodownStockAttributes, GodownStockCreationAttributes>
  implements GodownStockAttributes
{
  public id!: number;
  public InvId!: number;
  public GodownId!: number;
  public FranchiseId!: number;
  public ProdId?: number | null;
  public Qty?: string | null;
  public Unit?: string | null;
  public StockDate?: Date | null;
  public Narration?: string | null;
  public Status?: string | null;
  public CreatedBy!: number;
  public CreatedDate?: Date | null;
  public ModifiedBy!: number;
  public ModifiedDate?: Date | null;
  public UserId!: number;
  public TransferId!: number;
  public Price?: number | null;
  public TotalPrice?: number | null;
  public CgstPer?: string | null;
  public SgstPer?: string | null;
  public IgstPer?: string | null;
  public CgstAmt?: number | null;
  public SgstAmt?: number | null;
  public IgstAmt?: number | null;
  public GstAmt?: number | null;
  public OwnShop!: number;
  public RetailerId!: number;

  // If timestamps were used, they would be declared here.
  // However, timestamps are disabled per your migration.
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GodownStock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    InvId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    GodownId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    FranchiseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProdId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Qty: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Unit: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    StockDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    Narration: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING(10),
      allowNull: true,
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
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TransferId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Price: {
      type: DataTypes.FLOAT(14, 2),
      allowNull: true,
    },
    TotalPrice: {
      type: DataTypes.FLOAT(14, 2),
      allowNull: true,
    },
    CgstPer: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    SgstPer: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    IgstPer: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    CgstAmt: {
      type: DataTypes.FLOAT(14, 2),
      allowNull: true,
    },
    SgstAmt: {
      type: DataTypes.FLOAT(14, 2),
      allowNull: true,
    },
    IgstAmt: {
      type: DataTypes.FLOAT(14, 2),
      allowNull: true,
    },
    GstAmt: {
      type: DataTypes.FLOAT(14, 2),
      allowNull: true,
    },
    OwnShop: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    RetailerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tbl_godown_raw_prod_stock_2025",
    timestamps: false,
  }
);

export { GodownStock };
