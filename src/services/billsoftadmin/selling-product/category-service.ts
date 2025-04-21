import { Category, CategoryAttributes, CategoryCreationAttributes } from "@models/billsoftadmin/selling-product/category-model";

export const get = async (ProdType: number): Promise<Category[]> => {
    try {
        // Ensure ProdType is a valid number
        if (isNaN(ProdType)) {
            throw new Error("Invalid ProdType parameter");
        }

        const categories = await Category.findAll({ where: { ProdType } });

        if (!categories.length) {
            throw new Error(`No categories found for ProdType: ${ProdType}`);
        }

        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch Category");
    }
};


export const create = async (
    saveRecord: CategoryCreationAttributes
): Promise<Category> => {
    try {
        const newRecord = await Category.create(saveRecord);
        console.log("New Record:", newRecord);
        return newRecord;
    } catch (error) {
        console.error("Error creating Category:", error);
        throw error;
    }
};

// Get category by ID
export const edit = async (id: number): Promise<Category | null> => {
    try {
        return await Category.findByPk(id);
    } catch (error) {
        console.error("Error fetching Category by ID:", error);
        throw error;
    }
};

export const update = async (
    id: number,
    updates: Partial<CategoryAttributes>
): Promise<Category | null> => {
    try {
        const [rowsAffected, [updatedRecord]] = await Category.update(updates, {
            where: { id },
            returning: true,
        });
        return rowsAffected > 0 ? updatedRecord : null;
    } catch (error) {
        console.error("Error updating Category:", error);
        throw error;
    }
};

export const destroy = async (id: number): Promise<boolean> => {
    try {
        const deletedCount = await Category.destroy({ where: { id } });
        return deletedCount > 0;
    } catch (error) {
        console.error("Error deleting Category:", error);
        throw error;
    }
};

export const getList = async (ProdType: number): Promise<Pick<Category, "id" | "Name">[]> => {
    try {
        // Ensure ProdType is a valid number
        if (isNaN(ProdType)) {
            throw new Error("Invalid ProdType parameter");
        }

        const categories = await Category.findAll({
            where: { ProdType },
            attributes: ["id", "Name"] // Select only 'id' and 'Name' fields
        });

        if (!categories.length) {
            throw new Error(`No categories found for ProdType: ${ProdType}`);
        }

        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch Category");
    }
};
