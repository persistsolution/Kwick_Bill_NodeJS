import { db } from "config/knexconfig";

export interface TransferStockCreationAttributes {
    GodownId: number;
    OwnShop:number;
    FranchiseId: number;
    TotQty: number;
    GstAmount: number;
    TotalAmount: number;
    InvoiceNo: number;
    StockDate: string;
    Narration: string;
    productdetails: {
        GodownProdId: number;
        AvailStock: number;
        AvailStockUnit: string;
        Qty: number;
        QtyUnit: string;
        Price: number;
        TotalPrice: number;
        CgstPer: number;
        SgstPer: number;
        IgstPer: number;
        GstAmt: number;
    }[];
}

// Get Godown Account
export const get = async (OwnShop: number): Promise<any[]> => {
    try {
        if (isNaN(OwnShop)) {
            throw new Error("Invalid parameter");
        }

        const result = await db("tbl_transfer_godown_raw_prod_stock_2025 as tp")
            .leftJoin("tbl_users_bill as tu", "tu.id", "tp.GodownId")
            .leftJoin("tbl_users_bill as tu2", "tu2.id", "tp.FranchiseId")
            .select(
                "tp.StockDate",
                "tp.TotQty",
                "tp.TotalAmount",
                "tp.Narration",
                "tp.CreatedDate",
                "tp.id",
                "tu.Fname as GodownName",
                "tu2.ShopName"
            )
            .where("tp.OwnShop", OwnShop);

        if (!result.length) {
            throw new Error(`No stock found for OwnShop: ${OwnShop}`);
        }

        return result;
    } catch (error) {
        console.error("Error fetching Transfer Stock:", error);
        throw new Error("Failed to fetch Transfer Stock");
    }
};

// Create godown stock
export const create = async (saveRecord: TransferStockCreationAttributes) => {
    try {
        // Step 1: Insert Stock Transfer Record (`tbl_transfer_godown_raw_prod_stock_2025`)
        const [UseRawId] = await db("tbl_transfer_godown_raw_prod_stock_2025")
            .insert({
                GodownId: saveRecord.GodownId,
                FranchiseId: saveRecord.FranchiseId,
                StockDate: saveRecord.StockDate,
                TotQty: saveRecord.TotQty,
                Narration: saveRecord.Narration,
                CreatedBy: 1, // Replace with authenticated user ID
                CreatedDate: new Date(),
                TotalAmount: saveRecord.TotalAmount,
                InvoiceNo: saveRecord.InvoiceNo,
                GstAmount: saveRecord.GstAmount,
                OwnShop: saveRecord.OwnShop,
            })
            .returning("id"); // Ensures ID is auto-generated

        if (!UseRawId || !UseRawId.id) {
            throw new Error("Failed to retrieve generated ID for stock transfer.");
        }

        const TransferId = UseRawId.id; // Use the generated TransferId

        // Step 2: Insert into `tbl_transfer_godown_raw_stock_items_2025`
        await insertIntoTransferStockItems(saveRecord, TransferId);

        // Step 3: Insert into `tbl_godown_raw_prod_stock_2025`
        await insertIntoGodownStock(saveRecord, TransferId);

        return { message: "Stock added successfully" };
    } catch (error) {
        console.error("Error inserting data:", error);
        throw error;
    }
};

/**
 * Function to insert product details into `tbl_transfer_godown_raw_stock_items_2025`
 */
const insertIntoTransferStockItems = async (saveRecord: TransferStockCreationAttributes, TransferId: number) => {
    const productRecords = saveRecord.productdetails.map(product => ({
        TransferId,
        GodownId: saveRecord.GodownId,
        FranchiseId: saveRecord.FranchiseId,
        ProdId: product.GodownProdId,
        Qty: product.Qty,
        Unit: product.QtyUnit,
        Price: product.Price,
        TotalPrice: product.TotalPrice,
        CgstPer: product.CgstPer,
        SgstPer: product.SgstPer,
        IgstPer: product.IgstPer,
        CgstAmt: (product.TotalPrice * product.CgstPer) / 100,
        SgstAmt: (product.TotalPrice * product.SgstPer) / 100,
        IgstAmt: (product.TotalPrice * product.IgstPer) / 100,
        GstAmt: product.GstAmt,
        CreatedDate: new Date(),
        CreatedBy: 1, // Replace with authenticated user ID
        StockDate: saveRecord.StockDate,
        OwnShop: saveRecord.OwnShop,
        Receive: 0, // Default value
        FrProdId:0,
    }));

    await db("tbl_transfer_godown_raw_stock_items_2025").insert(productRecords);
};

/**
 * Function to insert product details into `tbl_godown_raw_prod_stock_2025`
 */
const insertIntoGodownStock = async (saveRecord: TransferStockCreationAttributes, TransferId: number) => {
    const stockRecords = saveRecord.productdetails.map(product => ({
        TransferId,
        GodownId: saveRecord.GodownId,
        FranchiseId: saveRecord.FranchiseId,
        ProdId: product.GodownProdId,
        Qty: product.Qty,
        Unit: product.QtyUnit,
        Price: product.Price,
        TotalPrice: product.TotalPrice,
        CgstPer: product.CgstPer,
        SgstPer: product.SgstPer,
        IgstPer: product.IgstPer,
        CgstAmt: (product.TotalPrice * product.CgstPer) / 100,
        SgstAmt: (product.TotalPrice * product.SgstPer) / 100,
        IgstAmt: (product.TotalPrice * product.IgstPer) / 100,
        GstAmt: product.GstAmt,
        CreatedDate: new Date(),
        CreatedBy: 1, // Replace with authenticated user ID
        StockDate: saveRecord.StockDate,
        OwnShop: saveRecord.OwnShop,
        Status: "Dr",
        Narration: saveRecord.Narration,
        InvId:0,
        ModifiedBy:0,
        UserId:0,
        RetailerId:0
    }));

    await db("tbl_godown_raw_prod_stock_2025").insert(stockRecords);
};