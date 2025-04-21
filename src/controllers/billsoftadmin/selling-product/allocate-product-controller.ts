import { Request, Response } from 'express';
import { get,update} from "@services/billsoftadmin/selling-product/allocate-product-services";
// Get all Product
export const getController = async (req: Request, res: Response): Promise<void> => {
    try {
      const listed = await get(Number(req.params.CreatedBy));
      res.json(listed);
    } catch (error) {
      console.error("Error fetching Product:", error);
      res.status(500).json({ message: error });
    }
  };

  export const updateController = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extracting id from request body
        const { id, ...updateData } = req.body;

        // Check if ID exists
        if (!id) {
            console.error("ID is missing in the request body.");
            res.status(400).json({ message: "ID is required for updating." });
            return;
        }

        console.log("Received ID for update:", id);

        // Call the update service
        const updatedRecord = await update({ id, ...updateData });

        // If no record is returned, it means the update failed or the record was not found
        if (!updatedRecord) {
            res.status(404).json({ message: "Record not found" });
            return;
        }

        console.log("CheckStatus Updated Successfully:", updatedRecord);

        // Send success response
        res.status(200).json({
            message: "CheckStatus updated successfully",
            updatedRecord,
        });

    } catch (error) {
        console.error("Error updating checkstatus:", error);
        res.status(500).json({ message: "Failed to update checkstatus" });
    }
};

  