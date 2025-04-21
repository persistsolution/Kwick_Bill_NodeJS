import { FrProduct, FrProductAttributes, FrProductCreationAttributes, associateFrProduct } from "@models/billsoftadmin/selling-product/allocate-product-model";
import { Category, associateCategory } from "@models/billsoftadmin/selling-product/category-model"; // Import Category Model
import { SubCategory, associateSubCategory } from "@models/billsoftadmin/selling-product/subcategory-model"; // Import SubCategory Model
import { db } from "config/knexconfig";
import { Op, Sequelize } from "sequelize";

// Initialize model associations before querying the database
// associateFrProduct();
// associateCategory();
// associateSubCategory();

// Define response type with non-nullable properties
// interface FrProductResponse {
//     id: number;
//     ProductName: string;
//     BarcodeNo: string;
//     checkstatus: number;
//     ProdType2: number;
//     MinPrice: number;
//     Category: string;
//     SubCatName: string;
// }

// Fetch products with proper associations and query conditions
// export const get = async (CreatedBy: number): Promise<FrProductResponse[]> => {
//     try {
//       if (!CreatedBy || isNaN(CreatedBy)) {
//         throw new Error("Invalid CreatedBy parameter");
//       }

//       const products = await FrProduct.findAll({
//         where: {
//           ProdType: 0, // WHERE p.ProdType=0
//           ProdType2: { [Op.ne]: 3 }, // WHERE p.ProdType2 != 3
//           CreatedBy: CreatedBy, // WHERE p.CreatedBy='$frid'
//         },
//         attributes: [
//           "id",
//           ["ProductName","ProductName"],
//           ["BarcodeNo", "BarcodeNo"],
//           ["checkstatus","checkstatus"],
//           ["ProdType2","ProdType2"],
//           ["MinPrice", "MinPrice"],
//         ],
//         include: [
//           {
//             model: Category,
//             as: "Category",
//             attributes: [["Name", "CategoryName"]], // Fetching Name field directly
//           },
//           {
//             model: SubCategory,
//             as: "SubCategory",
//             attributes: [["Name", "SubCategoryName"]], // Fetching Name field directly
//             required: false, // Avoids errors if no match is found
//             on: Sequelize.literal(`
//               CASE
//                 WHEN "FrProduct"."SubCatId" ~ '^[0-9]+$' 
//                 THEN CAST("FrProduct"."SubCatId" AS INTEGER) = "SubCategory"."id"
//                 ELSE FALSE
//               END
//             `) // Only cast if `SubCatId` is a valid number
//           },
//         ],
//       });

//       if (!products.length) {
//         return []; // Return empty array instead of throwing an error
//       }

//       // Map to correct properties (Ensure non-null/undefined values)
//       return products.map((product) => ({
//         id: product.id,
//         ProductName: product.ProductName ?? "", // Ensure non-null string
//         BarcodeNo: product.BarcodeNo ?? "", // Ensure non-null string
//         checkstatus: product.checkstatus,
//         ProdType2: product.ProdType2,
//         MinPrice: product.MinPrice ?? 0, // Ensure non-null number
//         Category: product.Category?.Name ?? "", // Ensure non-null string
//         SubCatName: product.SubCategory?.Name ?? "", // Ensure non-null string
//       }));
//     } catch (error) {
//       console.error("Error fetching Products:", error);
//       throw new Error("Failed to fetch Products");
//     }
//   };


export const get = async (CreatedBy: number) => {
    try {
        if (!CreatedBy) {
            throw new Error("Missing CreatedBy parameter");
        }

        // Ensure CreatedBy is an integer
        const createdByInt = typeof CreatedBy === 'string' ? parseInt(CreatedBy, 10) : CreatedBy;
        if (isNaN(createdByInt)) {
            throw new Error("Invalid CreatedBy parameter. Must be an integer.");
        }

        const result = await db('tbl_cust_products_2025 as p')
            .select(
                'p.ProductName', 'p.BarcodeNo', 'p.checkstatus', 'p.id',
                'p.ProdType2', 'p.MinPrice', 'c.Name as Category',
                'cs.Name as SubCatName'
            )
            .innerJoin('tbl_cust_category_2025 as c', 'c.id', 'p.CatId')
            .innerJoin('tbl_cust_sub_category_2025 as cs', function () {
                this.on('cs.id', '=', 'p.SubCatId');
            })
            .where('p.ProdType', 0)
            .whereNot('p.ProdType2', 3)
            .where('p.CreatedBy', createdByInt);

        return result;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Internal server error");
    }
};


export const update = async (saveRecord: FrProductAttributes): Promise<FrProduct | null> => {
    try {
        // Extract id and other data
        const { id, checkstatus } = saveRecord;

        // Check if ID is provided
        if (!id) {
            console.error("ID is missing in update request");
            throw new Error("ID is required for updating the record");
        }

        console.log("Received ID for update:", id);

        // Find the existing record
        const existingRecord = await FrProduct.findByPk(id);

        if (!existingRecord) {
            console.error(`Record not found for ID: ${id}`);
            throw new Error("Record not found");
        }

        // Update checkstatus and any other provided fields
        await existingRecord.update({ checkstatus: checkstatus });

        console.log("Record Updated Successfully:", existingRecord);
        return existingRecord;
    } catch (error) {
        console.error("Error updating FrProduct:", error);
        throw error;
    }
};

