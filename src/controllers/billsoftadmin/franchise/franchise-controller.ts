import { Request, Response } from 'express';
import { create, destroy, get, edit, update,getAllocateRawIds, getOwnFr} from "@services/billsoftadmin/franchise/franchise-services";

// Get Franchises by Type
export const getController = async (req: Request, res: Response): Promise<void> => {
  try {
    const Roll = Number(req.params.Roll);
    if (isNaN(Roll)) {
      res.status(400).json({ message: "Invalid Franchise Type parameter" });
      return;
    }

    const franchises = await get(Roll);
    res.status(200).json(franchises);
  } catch (error) {
    console.error("Error fetching Franchise:", error);
    res.status(500).json({ message: "Failed to fetch Franchise" });
}
};

// Create Franchise
export const createController = async (req: Request, res: Response): Promise<void> => {
  try {
    const createdFranchise = await create(req.body);
    console.log("Franchise Created Successfully:", createdFranchise);
    res.status(200).json({ message: "Franchise created successfully", data: createdFranchise });
  } catch (error) {
    console.error("Error creating Franchise:", error);
    const errMsg = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: "Failed to create Franchise", error: errMsg });
  }
};

// Get Franchise by ID
export const editController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID parameter" });
      return;
    }

    const franchise = await edit(id);
    if (!franchise) {
      res.status(404).json({ message: "Franchise not found" });
    } else {
      res.status(200).json(franchise);
    }
  } catch (error) {
    console.error("Error fetching Franchise by ID:", error);
    const errMsg = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: "Failed to fetch Franchise", error: errMsg });
  }
};

// Update Franchise
export const updateController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID parameter" });
      return;
    }

    const updatedFranchise = await update(id, req.body);
    console.log("Franchise Updated Successfully:", updatedFranchise);
    res.status(200).json({ message: "Franchise updated successfully", data: updatedFranchise });
  } catch (error) {
    console.error("Error updating Franchise:", error);
    const errMsg = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: "Failed to update Franchise", error: errMsg });
  }
};

// Delete Franchise
export const deleteController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID parameter" });
      return;
    }

    const deleted = await destroy(id);
    if (deleted) {
      res.status(200).json({ message: "Franchise deleted successfully" });
    } else {
      res.status(404).json({ message: "Franchise not found" });
    }
  } catch (error) {
    console.error("Error deleting Franchise:", error);
    const errMsg = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: "Failed to delete Franchise", error: errMsg });
  }
};

// Get Franchise by ID
export const getAllocateRawIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID parameter" });
      return;
    }

    const franchise = await getAllocateRawIds(id);
    if (!franchise) {
      res.status(404).json({ message: "Franchise not found" });
    } else {
      // Extract only the AllocateRawProd field
      const { AllocateRawProd } = franchise;
      res.status(200).json({ AllocateRawProd });
    }
  } catch (error) {
    console.error("Error fetching Franchise by ID:", error);
    const errMsg = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: "Failed to fetch Franchise", error: errMsg });
  }
};

// Get Franchises by Ownfracnhise
export const getOwnFrController = async (req: Request, res: Response): Promise<void> => {
  try {
    const OwnFranchise = Number(req.params.OwnFranchise);
    if (isNaN(OwnFranchise)) {
      res.status(400).json({ message: "Invalid Franchise Type parameter" });
      return;
    }

    const franchises = await getOwnFr(OwnFranchise);
    res.status(200).json(franchises);
  } catch (error) {
    console.error("Error fetching Franchise:", error);
    res.status(500).json({ message: "Failed to fetch Franchise" });
}
};