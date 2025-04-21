import { UserBill, UserBillAttributes, UserBillCreationAttributes } from "@models/billsoftadmin/franchise/franchise-model";

// Get Franchises by FranchiseType
export const get = async (Roll: number): Promise<UserBill[]> => {
    try {
        if (isNaN(Roll)) {
            throw new Error("Invalid FranchiseType parameter");
        }

        const franchises = await UserBill.findAll({ where: { Roll } });

        if (!franchises.length) {
            throw new Error(`No franchises found for FranchiseType: ${Roll}`);
        }

        return franchises;
    } catch (error) {
        console.error("Error fetching franchises:", error);
        throw new Error("Failed to fetch Franchise");
    }
};

// Create Franchise
export const create = async (
    saveRecord: UserBillCreationAttributes
): Promise<UserBill> => {
    try {
        const newRecord = await UserBill.create(saveRecord);
        console.log("New Franchise Record:", newRecord);
        return newRecord;
    } catch (error) {
        console.error("Error creating Franchise:", error);
        throw error;
    }
};

// Get Franchise by ID
export const edit = async (id: number): Promise<UserBill | null> => {
    try {
        return await UserBill.findByPk(id);
    } catch (error) {
        console.error("Error fetching Franchise by ID:", error);
        throw error;
    }
};

// Update Franchise
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
        console.error("Error updating Franchise:", error);
        throw error;
    }
};

// Delete Franchise
export const destroy = async (id: number): Promise<boolean> => {
    try {
        const deletedCount = await UserBill.destroy({ where: { id } });
        return deletedCount > 0;
    } catch (error) {
        console.error("Error deleting Franchise:", error);
        throw error;
    }
};

// Get Franchise by ID
export const getAllocateRawIds = async (id: number): Promise<{ AllocateRawProd: any } | null> => {
    try {
      const userBill = await UserBill.findByPk(id);
      if (!userBill) {
        return null;
      }
      // Convert the Sequelize instance to a plain object
      const data = userBill.get({ plain: true });
      return { AllocateRawProd: data.AllocateRawProd };
    } catch (error) {
      console.error("Error fetching Franchise by ID:", error);
      throw error;
    }
  };

  // Get Franchises by OwnFranchiseType
export const getOwnFr = async (OwnFranchise: number): Promise<UserBill[]> => {
    try {
        if (isNaN(OwnFranchise)) {
            throw new Error("Invalid FranchiseType parameter");
        }

        const franchises = await UserBill.findAll({
            where: { Roll: 5, OwnFranchise },
            attributes: ["id", "ShopName"]  // Only select "id" and "shopname"
        });

        if (!franchises.length) {
            throw new Error(`No franchises found for FranchiseType: ${OwnFranchise}`);
        }

        return franchises;
    } catch (error) {
        console.error("Error fetching franchises:", error);
        throw new Error("Failed to fetch Franchise");
    }
};