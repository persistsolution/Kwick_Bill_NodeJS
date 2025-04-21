import { SubCategory, SubCategoryCreationAttributes } from "@models/billsoftadmin/selling-product/subcategory-model";
import { db } from "config/knexconfig";

// Get all categories
export const get = async (ProdType: number): Promise<SubCategory[]> => {
  try {
      // Validate ProdType
      if (isNaN(ProdType)) {
          throw new Error("Invalid ProdType parameter");
      }

      // Query using Knex.js
      const categories = await db("tbl_cust_sub_category_2025 as sb")
          .select("sb.*", "c.Name as CatName")
          .join("tbl_cust_category_2025 as c", "c.id", "sb.CatId")
          .where("sb.ProdType", ProdType)
          .orderBy("sb.id", "desc");

      if (!categories.length) {
          throw new Error(`No Sub categories found for ProdType: ${ProdType}`);
      }

      return categories;
  } catch (error) {
      console.error("Error fetching Sub categories:", error);
      throw new Error("Failed to fetch Sub Category");
  }
};
  
  // Create a category
  export const create= async (
    data: SubCategoryCreationAttributes
  ): Promise<SubCategory> => {
    try {
      const newSubCategory = await SubCategory.create({ ...data }); // ✅ Auto-increment `id`
      console.log("New SubCategory Created:", newSubCategory);
      return newSubCategory;
    } catch (error) {
      console.error("Error creating SubCategory:", error);
      throw error;
    }
  };
  
  // Get category by ID
  export const edit = async (id: number): Promise<SubCategory | null> => {
    return await SubCategory.findByPk(id);
  };
  
  // Update category by ID
  export const update = async (id: number, updates: Partial<SubCategory>): Promise<SubCategory | null> => {
    const category = await SubCategory.findByPk(id);
    if (category) {
      await category.update(updates);
      return category;
    }
    return null;
  };
  
  // Delete category by ID
  export const destroy = async (id: number): Promise<boolean> => {
    const deletedCount = await SubCategory.destroy({ where: { id } });
    return deletedCount > 0;
  };


  
export const getSubCategory = async (CatId: number): Promise<Pick<SubCategory, "id" | "Name">[]> => {
  try {
      // Ensure ProdType is a valid number
      if (isNaN(CatId)) {
          throw new Error("Invalid ProdType parameter");
      }

      const categories = await SubCategory.findAll({
          where: { CatId },
          attributes: ["id", "Name"] // Select only 'id' and 'ProductName' fields
      });

      if (!categories.length) {
          throw new Error(`No categories found: ${CatId}`);
      }

      return categories;
  } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Failed to fetch Sub Category");
  }
};
