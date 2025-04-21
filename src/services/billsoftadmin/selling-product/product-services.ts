import { Product, ProductAttributes, ProductCreationAttributes } from "@models/billsoftadmin/selling-product/product-model";
import { db } from "config/knexconfig";
import { Op } from "sequelize";


export const get = async (prodType: number | string): Promise<Product[]> => {
    try {
        // Convert prodType to a number if it's a string
        const prodTypeNum = Number(prodType);
        if (isNaN(prodTypeNum)) {
            throw new Error("Invalid prodType parameter. Must be a number.");
        }

        const products: Product[] = await db("tbl_cust_products2 as tp")
            .leftJoin("tbl_cust_category_2025 as tc", "tc.id", "tp.CatId")
            .leftJoin("tbl_cust_sub_category_2025 as tcs", "tcs.id", "tp.SubCatId")
            .select(
                "tp.BarcodeNo",
                "tp.id",
                "tp.ProductName",
                "tp.CreatedDate",
                "tc.Name as CatName",
                "tcs.Name as SubCatName",
                "tp.ProdType2",
                "tp.Status",
                "tp.MinPrice"
            )
            .where("tp.ProdType", prodTypeNum)
            .whereNot("tp.ProdType2", 3)
            .orderBy("tp.CreatedDate", "desc");

        if (!products.length) {
            throw new Error("No products found.");
        }

        return products;
    } catch (error) {
        console.error("Error fetching Raw Product:", error);
        throw new Error("Failed to fetch Raw Product");
    }
};


export const create = async (
    saveRecord: ProductCreationAttributes
): Promise<Product> => {
    try {
        const newRecord = await Product.create(saveRecord);
        console.log("New Record:", newRecord);
        return newRecord;
    } catch (error) {
        console.error("Error creating Product:", error);
        throw error;
    }
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

export const update = async (
    id: number,
    updates: Partial<ProductAttributes>
): Promise<Product | null> => {
    try {
        const [rowsAffected, [updatedRecord]] = await Product.update(updates, {
            where: { id },
            returning: true,
        });
        return rowsAffected > 0 ? updatedRecord : null;
    } catch (error) {
        console.error("Error updating Product:", error);
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



