import { Product, ProductAttributes, ProductCreationAttributes } from "@models/billsoftadmin/selling-product/product-model";
import { db } from "config/knexconfig";
import { Op } from "sequelize";
import { Knex } from "knex";
import { UserBill } from "@models/billsoftadmin/franchise/franchise-model";

export const get = async (ProdType: number | string): Promise<Product[]> => {
    try {
        // Ensure ProdType is a number (convert if it's a string)
        const prodTypeNum = Number(ProdType);
        if (isNaN(prodTypeNum)) {
            throw new Error("Invalid ProdType parameter");
        }

        const categories = await db('tbl_cust_products2 as tp')
            .leftJoin('tbl_cust_category_2025 as tc', 'tc.id', 'tp.CatId')
            .leftJoin('tbl_cust_sub_category_2025 as tcs', 'tcs.id', 'tp.SubCatId')
            .select(
                'tp.ProductName',
                'tp.CreatedDate',
                'tp.id',
                'tc.Name as CatName',
                'tcs.Name as SubCatName',
                "tp.Status",
            )
            .where('tp.ProdType', prodTypeNum) // Ensure ProdType is passed as a number
            .orderBy('tp.CreatedDate', 'desc');

        if (!categories.length) {
            throw new Error(`No Raw Product found`);
        }

        return categories;
    } catch (error) {
        console.error("Error fetching Raw Product:", error);
        throw new Error("Failed to fetch Raw Product");
    }
};

export const create = async (
    saveRecord: ProductCreationAttributes,
    productDetails: { id: number; Qty: number; Unit: string }[]
): Promise<any> => {
    return await db.transaction(async (trx: Knex.Transaction) => {
        try {
            // Insert Product using Knex
            const insertedProduct = await trx("tbl_cust_products2") // Update table name if needed
                .insert(saveRecord)
                .returning("id");

            const prodid = insertedProduct[0].id; // Extracts actual integer ID
            console.log("New Product Inserted:", prodid);

            // Prepare data for bulk insert
            if (productDetails.length > 0) {
                const insertData = productDetails.map((product) => ({
                    RawQty: product.Qty,
                    RawUnit: product.Unit,
                    RawProdId: prodid, // Now it's correctly an integer
                    CustProdId: product.id,
                    MakingQty: product.Qty,
                    MakingQtyUnit2: product.Unit,
                    MakingQty2: product.Qty,
                }));

                // Bulk insert into `tbl_raw_prod_make_qty_2025`
                await trx("tbl_raw_prod_make_qty_2025").insert(insertData);
            }

            console.log("Product details inserted successfully!");
            return { id: prodid, ...saveRecord }; // Return the inserted product
        } catch (error) {
            console.error("Error creating Product:", error);
            throw error; // Transaction auto-rolls back on error
        }
    });
};

// Get category by ID
export const edit = async (id: number): Promise<Product | null> => {
    try {
        return await Product.findByPk(id);
    } catch (error) {
        console.error("Error fetching Product by ID:", error);
        throw error;
    }
};

export const destroy = async (id: number): Promise<boolean> => {
    try {
        const deletedCount = await Product.destroy({ where: { id } });
        return deletedCount > 0;
    } catch (error) {
        console.error("Error deleting Product:", error);
        throw error;
    }
};

export const getMakingProdList = async (): Promise<Pick<Product, "id" | "ProductName">[]> => {
    try {
        const categories = await Product.findAll({
            where: { Status: 1, ProdType: 0, ProdType2: 2 }, // Added Status filter and AND condition
            attributes: ["id", "ProductName"], // Ensure correct field names
            order: [["ProductName", "ASC"]] // Order by ProductName ascending
        });

        console.log("Fetched Categories:", JSON.stringify(categories, null, 2)); // Debugging

        return categories.map(product => product.get({ plain: true })); // Ensure raw objects
    } catch (error) {
        console.error("Error fetching Product:", error);
        throw new Error("Failed to fetch Product");
    }
};

// allocate raw prod id
export const allocateRawProdService = async (FrId: number, RawProdId: string) => {
    try {
        // Convert RawProdId to a string format for updating
        const AllocateProd = RawProdId.trim();

        // Update tbl_users_bill using the UserBill model
        const userBillUpdate = await UserBill.update(
            { AllocateRawProd: AllocateProd },
            { where: { id: FrId } }
        );

        // Check if at least one table was updated
        if (userBillUpdate[0] > 0) {
            return { success: true, message: `Successfully updated AllocateRawProd for Franchise ID ${FrId}` };
        } else {
            return { success: false, status: 404, message: "No records found for the given FrId" };
        }
    } catch (error: unknown) {
        // Ensure TypeScript knows `error` is an instance of Error
        const errMsg = error instanceof Error ? error.message : "Unknown error";

        console.error("Error in allocateRawProdService:", errMsg);
        return { success: false, status: 500, message: "Database update failed", error: errMsg };
    }
};