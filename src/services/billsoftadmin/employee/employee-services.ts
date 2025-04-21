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

export const login = async (Phone: string): Promise<UserBill[]> => {
    try {
      if (!Phone) {
        throw new Error("Phone number is required");
      }
  
      // First, check if any record exists
      const employeeCount = await UserBill.count({
        where: {
          Roll: [1, 63, 64], // Equivalent to WHERE Roll IN (1,63,64)
          BillSoftFrId: 0,   // Additional condition
          Phone: Phone       // Phone match condition
        }
      });
  
      if (employeeCount === 0) {
        throw new Error("No Employee found with the given criteria");
      }
  
      // Fetch only the required fields if records exist
      const employees = await UserBill.findAll({
        where: {
          Roll: [1, 63, 64],
          BillSoftFrId: 0,
          Phone: Phone
        },
        attributes: ["id", "Fname", "Phone", "Status"], // Select only specific fields
      });
  
      return employees as UserBill[]; // Ensure type safety
    } catch (error) {
      console.error("Error fetching Employees:", error);
      throw new Error("Failed to fetch Employees");
    }
  };