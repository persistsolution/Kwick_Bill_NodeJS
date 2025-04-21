import { Request, Response } from 'express';
import { create, destroy, get, edit, update} from "@services/billsoftadmin/selling-product/product-services";
// Get all Product
export const getController = async (req: Request, res: Response): Promise<void> => {
    try {
      const listed = await get(Number(req.params.ProdType));
      res.json(listed);
    } catch (error) {
      console.error("Error fetching Product:", error);
      res.status(500).json({ message: "Failed to fetch Product" });
    }
  };

  // Create Product
export const createController = async (req: Request, res: Response): Promise<void> => {
  try {
    const created = await create(req.body);
    console.log("Product Created Successfully:", created);
    res.status(200).json(created);
  } catch (error) {
    console.error("Error creating Product:", error);
    res.status(500).json({ message: "Failed to create Product" });
  }
  };

  // Get Product by ID
export const editController = async (req: Request, res: Response): Promise<void> => {
  try {
    const edited = await edit(Number(req.params.id));
    if (!edited) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.json(edited);
    }
  } catch (error) {
    console.error("Error fetching Product by ID:", error);
    res.status(500).json({ message: "Failed to fetch Product" });
  }
};

// Update Product
export const updateController = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await update(Number(req.params.id),req.body);
    console.log("Product Updated Successfully:", updated);
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating Product", error);
    res.status(500).json({ message: "Failed to Updated Product" });
  }
  
};

// Delete Product
export const deleteController = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await destroy(Number(req.params.id));
    if (deleted) {
      res.status(200).json({ message: "delete Product successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting Product:", error);
    res.status(500).json({ message: "Failed to delete Product" });
  }
};

  