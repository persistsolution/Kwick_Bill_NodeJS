import { Request, Response } from 'express';
import { get,create} from "@services/billsoftadmin/godown/transfer-stock-services";

// Get Godown by Type
export const getController = async (req: Request, res: Response): Promise<void> => {
    try {
        const OwnShop = Number(req.params.OwnShop);

        if (isNaN(OwnShop)) {
            res.status(400).json({ message: "Invalid parameter" });
            return;
        }

        const result = await get(OwnShop);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching Transfer Stock:", error);
        res.status(500).json({ message: "Failed to fetch Transfer Stock" });
    }
};

  // Create Godown
  export const createController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { GodownId, OwnShop, FranchiseId, TotQty, GstAmount, TotalAmount, InvoiceNo, StockDate, Narration, productdetails } = req.body;

        if (!GodownId || !OwnShop || !FranchiseId || !TotQty || !TotalAmount || !InvoiceNo || !GstAmount || !StockDate || !productdetails || !Array.isArray(productdetails) || productdetails.length === 0) {
            res.status(400).json({ message: "Invalid input data." });
            return;
        }

        const saveRecord = {
            GodownId,
            OwnShop,
            FranchiseId,
            TotQty,
            GstAmount,
            TotalAmount,
            InvoiceNo,
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