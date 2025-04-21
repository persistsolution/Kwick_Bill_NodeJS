import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/sequelize"; // Adjust path as needed

// Interface for Product attributes
interface ProductAttributes {
    id: number;
    ProdId: number;
    ProductName?: string | null;
    BrandId: number;
    CatId: number;
    SubCatId: number;
    CgstPer?: string | null;
    SgstPer?: string | null;
    IgstPer?: string | null;
    CgstAmt?: number | null;
    SgstAmt?: number | null;
    IgstAmt?: number | null;
    GstAmt?: number | null;
    ProdPrice?: number | null;
    MinPrice?: number | null;
    Status: number; // Changed from BOOLEAN to SMALLINT
    SrNo?: number | null;
    Photo?: string | null;
    code?: string | null;
    CreatedDate?: Date | null;
    ModifiedDate?: Date | null;
    CreatedBy: number;
    ModifiedBy: number;
    BarcodeNo?: string | null;
    StockQty: number;
    TempPrdId: number;
    Display: number; // Changed from BOOLEAN to SMALLINT
    push_flag: number;
    delete_flag: number;
    modified_time?: Date | null;
    ProdType: number;
    Qty?: string | null;
    Unit?: string | null;
    Transfer: number;
    Assets: number;
    QrDisplay: string;
    MinQty?: string | null;
    ProdType2: number;
    PurchasePrice?: number | null;
    checkstatus: number;
    tempstatus: number;
}

// Define attributes for Product creation (all fields except `id` are optional)
interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: number;
    public ProdId!: number;
    public ProductName?: string | null;
    public BrandId!: number;
    public CatId!: number;
    public SubCatId!: number;
    public CgstPer?: string | null;
    public SgstPer?: string | null;
    public IgstPer?: string | null;
    public CgstAmt?: number | null;
    public SgstAmt?: number | null;
    public IgstAmt?: number | null;
    public GstAmt?: number | null;
    public ProdPrice?: number | null;
    public MinPrice?: number | null;
    public Status!: number;
    public SrNo?: number | null;
    public Photo?: string | null;
    public code?: string | null;
    public CreatedDate?: Date | null;
    public ModifiedDate?: Date | null;
    public CreatedBy!: number;
    public ModifiedBy!: number;
    public BarcodeNo?: string | null;
    public StockQty!: number;
    public TempPrdId!: number;
    public Display!: number;
    public push_flag!: number;
    public delete_flag!: number;
    public modified_time?: Date | null;
    public ProdType!: number;
    public Qty?: string | null;
    public Unit?: string | null;
    public Transfer!: number;
    public Assets!: number;
    public QrDisplay!: string;
    public MinQty?: string | null;
    public ProdType2!: number;
    public PurchasePrice?: number | null;
    public checkstatus!: number;
    public tempstatus!: number;
}

// Initialize the model
Product.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        ProdId: { type: DataTypes.INTEGER, allowNull: true },
        ProductName: { type: DataTypes.STRING, allowNull: true },
        BrandId: { type: DataTypes.INTEGER, allowNull: true },
        CatId: { type: DataTypes.INTEGER, allowNull: true },
        SubCatId: { type: DataTypes.INTEGER, allowNull: true, defaultValue: "0" },
        CgstPer: { type: DataTypes.STRING, allowNull: true },
        SgstPer: { type: DataTypes.STRING, allowNull: true },
        IgstPer: { type: DataTypes.STRING, allowNull: true },
        CgstAmt: { type: DataTypes.FLOAT(14, 2), allowNull: true },
        SgstAmt: { type: DataTypes.FLOAT(14, 2), allowNull: true },
        IgstAmt: { type: DataTypes.FLOAT(14, 2), allowNull: true },
        GstAmt: { type: DataTypes.FLOAT(14, 2), allowNull: true },
        ProdPrice: { type: DataTypes.FLOAT(14, 2), allowNull: true },
        MinPrice: { type: DataTypes.FLOAT(14, 2), allowNull: true },
        Status: { type: DataTypes.SMALLINT, allowNull: true, defaultValue: 1 },
        SrNo: { type: DataTypes.FLOAT(14, 2), allowNull: true },
        Photo: { type: DataTypes.STRING, allowNull: true },
        code: { type: DataTypes.STRING, allowNull: true },
        CreatedDate: { type: DataTypes.DATE, allowNull: true },
        ModifiedDate: { type: DataTypes.DATE, allowNull: true },
        CreatedBy: { type: DataTypes.INTEGER, allowNull: true },
        ModifiedBy: { type: DataTypes.INTEGER, allowNull: true },
        BarcodeNo: { type: DataTypes.STRING, allowNull: true },
        StockQty: { type: DataTypes.INTEGER, allowNull: true },
        TempPrdId: { type: DataTypes.INTEGER, allowNull: true },
        Display: { type: DataTypes.SMALLINT, allowNull: true, defaultValue: 1 },
        push_flag: { type: DataTypes.SMALLINT, allowNull: true, defaultValue: 0 },
        delete_flag: { type: DataTypes.SMALLINT, allowNull: true, defaultValue: 0 },
        modified_time: { type: DataTypes.DATE(3), allowNull: true },
        ProdType: { type: DataTypes.INTEGER, allowNull: true },
        Qty: { type: DataTypes.STRING(100), allowNull: true },
        Unit: { type: DataTypes.STRING(100), allowNull: true },
        Transfer: { type: DataTypes.SMALLINT, allowNull: true, defaultValue: 0 },
        Assets: { type: DataTypes.SMALLINT, allowNull: true, defaultValue: 0 },
        QrDisplay: { type: DataTypes.STRING(10), allowNull: true, defaultValue: "No" },
        MinQty: { type: DataTypes.STRING(50), allowNull: true },
        ProdType2: { type: DataTypes.SMALLINT, allowNull: true, defaultValue: 0 },
        PurchasePrice: { type: DataTypes.FLOAT(14, 2), allowNull: true },
        checkstatus: { type: DataTypes.SMALLINT, allowNull: true, defaultValue: 0 },
        tempstatus: { type: DataTypes.SMALLINT, allowNull: true, defaultValue: 0 },
    },
    {
        sequelize,
        tableName: "tbl_cust_products2",
        timestamps: false, // No createdAt/updatedAt fields
    }
);

export { ProductAttributes, ProductCreationAttributes };

