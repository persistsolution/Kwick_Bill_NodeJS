import { GodownStock, GodownStockAttributes, GodownStockCreationAttributes } from "@models/billsoftadmin/godown/godown-stock-model";
import { Product, ProductAttributes, ProductCreationAttributes } from "@models/billsoftadmin/selling-product/product-model";
import { db } from "config/knexconfig";
import { Knex } from "knex";
import { Op, QueryTypes } from "sequelize";

export interface StockProdDetails {
    Unit: string;
    Price: number;
    balqty: number;
    CgstPer: number;
    SgstPer: number;
    IgstPer: number;
}

interface ProductDetails {
    ProdId: number;
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
}

interface GodownStockCreationAttributes2 {
    GodownId: number;
    StockDate: string;
    Narration: string;
    productdetails: ProductDetails[];
}

// Get Godown Account
export const get = async (): Promise<GodownStock[]> => {
    try {
        const result = await db('tbl_godown_raw_prod_stock_2025 as ts')
            .innerJoin('tbl_cust_products2 as p', 'ts.ProdId', 'p.id')
            .innerJoin('tbl_users_bill as tub', 'ts.GodownId', 'tub.id')
            .select(
                'ts.StockDate',
                'ts.Qty',
                'ts.Unit',
                'ts.Price',
                'ts.TotalPrice',
                'ts.id',
                'p.ProductName',
                'tub.Fname'
            )
            .where('ts.UserId', '0')
            .andWhere('ts.Status', 'Cr');

        if (!result || result.length === 0) {
            throw new Error("No godown stock found");
        }

        return result;
    } catch (error) {
        console.error("Error fetching godown stock:", error);
        throw new Error("Failed to fetch godown stock");
    }
};


export const getStockProdList = async (): Promise<Product[]> => {
    try {
        return await Product.findAll({
            attributes: ['id', 'ProductName'],
            where: {
                Status: 1,
                ProdType2: {
                    [Op.in]: [1, 3]
                }
            },
            order: [['ProductName', 'ASC']]
        });
    } catch (error) {
        console.error("Error fetching stock product list:", error);
        throw error;
    }
};

export const getStockProdDetails = async (
    pid: number,
    godownid: number
): Promise<StockProdDetails> => {
    try {
        // Fetch product details
        const product = await db('tbl_cust_products2')
            .select('Unit', 'MinPrice', 'CgstPer', 'SgstPer', 'IgstPer')
            .where({ id: pid })
            .first();

        if (!product) {
            throw new Error('Product not found');
        }

        // Calculate balance quantity using a raw aggregate query
        const balResult = await db('tbl_godown_raw_prod_stock_2025')
            .where({ ProdId: pid, GodownId: godownid })
            .select(
                db.raw(
                    `COALESCE(SUM(CASE WHEN "Status" = 'Cr' THEN CAST("Qty" AS numeric) ELSE 0 END), 0) -
       COALESCE(SUM(CASE WHEN "Status" = 'Dr' THEN CAST("Qty" AS numeric) ELSE 0 END), 0) as balqty`
                )
            )
            .first();

        // Ensure balance quantity is non-negative
        let balqty = parseFloat(balResult?.balqty) || 0;
        if (balqty < 0) {
            balqty = 0;
        }

        return {
            Unit: product.Unit,
            Price: product.MinPrice,
            balqty,
            CgstPer: product.CgstPer,
            SgstPer: product.SgstPer,
            IgstPer: product.IgstPer,
        };
    } catch (error) {
        console.error("Error fetching stock product details:", error);
        throw error;
    }
};

// Create godown stock
export const create = async (saveRecord: GodownStockCreationAttributes2) => {
    try {
        // Insert product stock details
        const productRecords = saveRecord.productdetails.map(product => ({
            InvId: 0, // Fixed: Hardcoded InvId as per request
            GodownId: saveRecord.GodownId,
            ProdId: product.ProdId,
            Qty: product.Qty,
            Unit: product.QtyUnit,
            Price: product.Price,
            TotalPrice: product.TotalPrice,
            CgstPer: product.CgstPer,
            SgstPer: product.SgstPer,
            IgstPer: product.IgstPer,
            GstAmt: product.GstAmt,
            CgstAmt: (product.TotalPrice * product.CgstPer) / 100,
            SgstAmt: (product.TotalPrice * product.SgstPer) / 100,
            IgstAmt: (product.TotalPrice * product.IgstPer) / 100,
            CreatedBy: 1, // Change based on the authenticated user
            StockDate: saveRecord.StockDate,
            CreatedDate: new Date(),
            Status: "Cr",
            UserId: 0,
            FranchiseId:0,
            ModifiedBy:0,
            TransferId:0,
            RetailerId:0,
        }));

        // Perform bulk insert
        await db("tbl_godown_raw_prod_stock_2025").insert(productRecords);

        return { message: "Stock added successfully" };
    } catch (error) {
        console.error("Error inserting data:", error);
        throw error;
    }
};
