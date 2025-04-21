import { UserBill, UserBillAttributes, UserBillCreationAttributes } from "@models/billsoftadmin/franchise/franchise-model";

// Get Godown Account
export const get = async (Roll: number): Promise<UserBill[]> => {
    try {
        if (isNaN(Roll)) {
            throw new Error("Invalid parameter");
        }

        const franchises = await UserBill.findAll({ where: { Roll } });

        if (!franchises.length) {
            throw new Error(`No godown found: ${Roll}`);
        }

        return franchises;
    } catch (error) {
        console.error("Error fetching godown:", error);
        throw new Error("Failed to fetch godown");
    }
};

// Create godown
export const create = async (
    saveRecord: UserBillCreationAttributes
): Promise<UserBill> => {
    try {
        const newRecord = await UserBill.create(saveRecord);
        console.log("New godown Record:", newRecord);
        return newRecord;
    } catch (error) {
        console.error("Error creating godown:", error);
        throw error;
    }
};

// Get godown by ID
export const edit = async (id: number): Promise<UserBill | null> => {
    try {
        return await UserBill.findByPk(id);
    } catch (error) {
        console.error("Error fetching godown by ID:", error);
        throw error;
    }
};

// Update godown
export const update = async (
    id: number,
    updates: Partial<UserBillAttributes>
): Promise<UserBill | null> => {
    try {
        const [rowsAffected, [updatedRecord]] = await UserBill.update(updates, {
            where: { id },
            returning: true,
        });
        return rowsAffected > 0 ? updatedRecord : null;
    } catch (error) {
        console.error("Error updating godown:", error);
        throw error;
    }
};

// Delete godown
export const destroy = async (id: number): Promise<boolean> => {
    try {
        const deletedCount = await UserBill.destroy({ where: { id } });
        return deletedCount > 0;
    } catch (error) {
        console.error("Error deleting godown:", error);
        throw error;
    }
};

