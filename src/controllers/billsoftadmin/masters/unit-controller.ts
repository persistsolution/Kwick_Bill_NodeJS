import { Request, Response } from 'express';
import { get } from "@services/billsoftadmin/masters/unit-services";

export const getController = async (req: Request, res: Response): Promise<void> => {
    try {
        const listed = await get();
        res.json(listed);
    } catch (error) {
        console.error("Error fetching Unit:", error);
        res.status(500).json({ message: "Failed to fetch Unit" });
    }
};
