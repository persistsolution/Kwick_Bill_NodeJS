import { Brand, BrandAttributes, BrandCreationAttributes } from "@models/billsoftadmin/selling-product/brand-model";

export const get = async (): Promise<Brand[]> => {
    try {
        return await Brand.findAll();
    } catch (error) {
        console.error("Error fetching brands:", error);
        throw error;
    }
};

export const create = async (
    saveRecord: BrandCreationAttributes
): Promise<Brand> => {
    try {
        const newRecord = await Brand.create(saveRecord);
        console.log("newRecord--------", newRecord);
        return newRecord;
    } catch (error) {
        console.error("Error creating Brand:", error);
        throw error;
    }
};

// Get brand by ID
export const edit = async (id: number): Promise<Brand | null> => {
    try {
        return await Brand.findByPk(id);
    } catch (error) {
        console.error("Error fetching Brand by ID:", error);
        throw error;
    }
};

export const update = async (
    id: number,
    updates: Partial<BrandAttributes>
): Promise<Brand | null> => {
    try {
        const [rowsAffected, [updatedRecord]] = await Brand.update(updates, {
            where: { id },
            returning: true,
        });
        return rowsAffected > 0 ? updatedRecord : null;
    } catch (error) {
        console.error("Error updating Brand:", error);
        throw error;
    }
};

export const destroy = async (id: number): Promise<boolean> => {
    try {
        const deletedCount = await Brand.destroy({ where: { id } });
        return deletedCount > 0;
    } catch (error) {
        console.error("Error deleting Brand:", error);
        throw error;
    }
};