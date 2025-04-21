import { Unit } from "@models/billsoftadmin/masters/unit-model";

export const get = async (): Promise<Unit[]> => {
    try {
        return await Unit.findAll();
    } catch (error) {
        console.error("Error fetching Unit:", error);
        throw error;
    }
};