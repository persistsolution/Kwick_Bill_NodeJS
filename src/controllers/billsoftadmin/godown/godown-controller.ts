import { Request, Response } from 'express';
import { get,create,edit,destroy,update} from "@services/billsoftadmin/godown/godown-services";

// Get Godown by Type
export const getController = async (req: Request, res: Response): Promise<void> => {
  try {
    const Roll = Number(req.params.Roll);
    if (isNaN(Roll)) {
      res.status(400).json({ message: "Invalid Godown Type parameter" });
      return;
    }

    const godowns = await get(Roll);
    res.status(200).json(godowns);
  } catch (error) {
    console.error("Error fetching Godown:", error);
    res.status(500).json({ message: "Failed to fetch Godown" });
}
};

// Create Godown
export const createController = async (req: Request, res: Response): Promise<void> => {
  try {
    const createdGodown = await create(req.body);
    console.log("Godown Created Successfully:", createdGodown);
    res.status(201).json({ message: "Godown created successfully", data: createdGodown });
  } catch (error) {
    console.error("Error creating Godown:", error);
    const errMsg = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: "Failed to create Godown", error: errMsg });
  }
};

// Get Godown by ID
export const editController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID parameter" });
      return;
    }

    const godown = await edit(id);
    if (!godown) {
      res.status(404).json({ message: "Godown not found" });
    } else {
      res.status(200).json(godown);
    }
  } catch (error) {
    console.error("Error fetching Godown by ID:", error);
    const errMsg = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: "Failed to fetch Godown", error: errMsg });
  }
};

// Update Godown
export const updateController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID parameter" });
      return;
    }

    const updatedGodown = await update(id, req.body);
    console.log("Godown Updated Successfully:", updatedGodown);
    res.status(200).json({ message: "Godown updated successfully", data: updatedGodown });
  } catch (error) {
    console.error("Error updating Godown:", error);
    const errMsg = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: "Failed to update Godown", error: errMsg });
  }
};

// Delete Godown
export const deleteController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID parameter" });
      return;
    }

    const deleted = await destroy(id);
    if (deleted) {
      res.status(200).json({ message: "Godown deleted successfully" });
    } else {
      res.status(404).json({ message: "Godown not found" });
    }
  } catch (error) {
    console.error("Error deleting Godown:", error);
    const errMsg = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: "Failed to delete Godown", error: errMsg });
  }
};