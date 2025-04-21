import { Request, Response } from 'express';
import { get,getStockProdList,getStockProdDetails,create} from "@services/billsoftadmin/godown/godown-stock-services";

// Get Godown by Type
export const getController = async (req: Request, res: Response): Promise<void> => {
  try {
    const godowns = await get();
    res.status(200).json(godowns);
  } catch (error) {
    console.error("Error fetching Godown:", error);
    res.status(500).json({ message: "Failed to fetch Godown" });
}
};

// Get Godown stock product
export const getStockProdController = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await getStockProdList();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching Godown Product:", error);
      res.status(500).json({ message: "Failed to fetch Godown Product" });
  }
  };

  // Get Godown stock product details
export const getStockProdDetailsController = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await getStockProdDetails(Number(req.params.pid),Number(req.params.godownid));
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching Godown Product:", error);
      res.status(500).json({ message: "Failed to fetch Godown Product" });
  }
  };

  // Create Godown
  export const createController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { GodownId, StockDate, Narration, productdetails } = req.body;

        if (!GodownId || !StockDate || !productdetails || !Array.isArray(productdetails) || productdetails.length === 0) {
            res.status(400).json({ message: "Invalid input data." });
            return;
        }

        const saveRecord = {
            GodownId,
            StockDate,
            Narration,
            productdetails
        };

        const result = await create(saveRecord);
        res.status(200).json({ message: "Stock added successfully", data: result });
    } catch (error) {
        console.error("Error creating godown stock:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};