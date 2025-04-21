import { Request, Response } from 'express';
import { get, create, edit, destroy ,getMakingProdList,allocateRawProdService} from "@services/billsoftadmin/raw-product/product-services";
import { ProductCreationAttributes } from "@models/billsoftadmin/selling-product/product-model";

// Define the expected request body structure
interface AllocateRawProdRequest {
  FrId?: number | string; // Allow string input for conversion
  RawProdId?: string;
}

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

//save making product
export const createController = async (req: Request, res: Response): Promise<void> => {
  try {
    let productDetails: { id: number; Qty: number; Unit: string }[] = [];

    // Validate `productdetails`
    if (!req.body.productdetails) {
      res.status(400).json({ message: "Product details array is required" });
      return;
    }

    try {
      productDetails = typeof req.body.productdetails === "string"
        ? JSON.parse(req.body.productdetails)
        : req.body.productdetails;

      if (!Array.isArray(productDetails)) {
        throw new Error("Invalid format");
      }
    } catch (error) {
      console.error("JSON Parse Error:", error);
      res.status(400).json({ message: "Invalid JSON format in productdetails" });
      return;
    }

    // Validate each item in `productdetails`
    const validProductDetails = productDetails.filter(
      (item) => item.id !== undefined && item.Qty !== undefined && item.Unit !== undefined
    );

    if (validProductDetails.length === 0) {
      res.status(400).json({ message: "Invalid product details format. Each item must have id, Qty, and Unit." });
      return;
    }

    // Extract product information from `req.body`
    const saveRecord: ProductCreationAttributes = {
      ProductName: req.body.ProductName as string,
      Unit: req.body.Unit as string,
      CatId: Number(req.body.CatId),
      SubCatId: Number(req.body.SubCatId),
      ProdId: 0, // Default value
      BrandId: 0, // Default value
      Status: Number(req.body.Status) || 1, // Default to active
      CreatedBy: Number(req.body.CreatedBy) || 1,
      ModifiedBy: Number(req.body.ModifiedBy) || 1,
      CreatedDate: new Date(),
      ModifiedDate: new Date(),
      StockQty: Number(req.body.StockQty) || 0,
      TempPrdId: Number(req.body.TempPrdId) || 0,
      Display: Number(req.body.Display) || 1,
      push_flag: Number(req.body.push_flag) || 0,
      delete_flag: Number(req.body.delete_flag) || 0,
      ProdType: Number(req.body.ProdType) || 0,
      Transfer: Number(req.body.Transfer) || 0,
      Assets: Number(req.body.Assets) || 0,
      QrDisplay: req.body.QrDisplay || "No",
      MinQty: req.body.MinQty || null,
      ProdType2: Number(req.body.ProdType2) || 0,
      PurchasePrice: Number(req.body.PurchasePrice) || 0,
      checkstatus: Number(req.body.checkstatus) || 0,
      tempstatus: Number(req.body.tempstatus) || 0,
    };

    // Call service function to create product + details
    const createdProduct = await create(saveRecord, validProductDetails);
    console.log("Product Created Successfully:", createdProduct);

    res.status(200).json({
      message: "Product and details created successfully",
      productId: createdProduct.id,
      product: createdProduct,
      productdetails: validProductDetails,
    });
  } catch (error: unknown) {
    console.error("Error creating Product:", error);
    res.status(500).json({
      message: "Failed to create Product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
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

export const getMakingProdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const listed = await getMakingProdList();
    res.json(listed);
  } catch (error) {
    console.error("Error fetching Product:", error);
    res.status(500).json({ message: "Failed to fetch Product" });
  }
};

export const allocateRawProdController = async (req: Request, res: Response): Promise<void> => {
  try {
      // Extracting data from request body and enforcing types
      const { FrId, RawProdId } = req.body as AllocateRawProdRequest;

      // Convert FrId to a number (handle undefined)
      const parsedFrId = FrId !== undefined ? Number(FrId) : NaN;

      // Validate input data
      if (isNaN(parsedFrId) || !RawProdId) {
          res.status(400).json({ message: "Valid FrId (number) and RawProdId are required" });
          return;
      }

      // Call service to update records
      const updateResult = await allocateRawProdService(parsedFrId, RawProdId);

      if (updateResult.success) {
          res.status(200).json({ message: updateResult.message });
      } else {
          res.status(400).json({ message: updateResult.message });
      }
  } catch (error: unknown) {
      // Ensure TypeScript knows `error` is an instance of Error
      const errMsg = error instanceof Error ? error.message : "Unknown error";

      console.error("Error in allocateRawProdController:", errMsg);
      res.status(500).json({ message: "Internal Server Error", error: errMsg });
  }
};