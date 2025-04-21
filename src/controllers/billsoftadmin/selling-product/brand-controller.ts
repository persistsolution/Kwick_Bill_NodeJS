import { Request, Response } from 'express';
import { create, destroy, get, edit, update } from "@services/billsoftadmin/selling-product/brand-services";

export const getController = async (req: Request, res: Response): Promise<void> => {
    try {
        const listed = await get();
        res.json(listed);
    } catch (error) {
        console.error("Error fetching Brand:", error);
        res.status(500).json({ message: "Failed to fetch Brand" });
    }
};

// Create Brand
export const createController = async (req: Request, res: Response): Promise<void> => {
    try {
        const created = await create(req.body);
        console.log("Brand Created Successfully:", created);
        res.status(200).json(created);
    } catch (error) {
        console.error("Error creating Brand:", error);
        res.status(500).json({ message: "Failed to create Brand" });
    }
};

// Get Brand by ID
export const editController = async (req: Request, res: Response): Promise<void> => {
    try {
        const edited = await edit(Number(req.params.id));
        if (!edited) {
            res.status(404).json({ message: "Brand not found" });
        } else {
            res.json(edited);
        }
    } catch (error) {
        console.error("Error fetching Brand by ID:", error);
        res.status(500).json({ message: "Failed to fetch Brand" });
    }
};

// Update Brand
export const updateController = async (req: Request, res: Response): Promise<void> => {
    try {
        const updated = await update(Number(req.params.id), req.body);
        console.log("Brand Updated Successfully:", updated);
        res.status(200).json(updated);
    } catch (error) {
        console.error("Error updating Brand", error);
        res.status(500).json({ message: "Failed to update Brand" });
    }
};

// Delete Brand
export const deleteController = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleted = await destroy(Number(req.params.id));
        if (deleted) {
            res.status(200).json({ message: "Deleted Brand successfully" });
        } else {
            res.status(404).json({ message: "Brand not found" });
        }
    } catch (error) {
        console.error("Error deleting Brand:", error);
        res.status(500).json({ message: "Failed to delete Brand" });
    }
};
