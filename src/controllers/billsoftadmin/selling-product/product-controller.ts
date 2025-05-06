import { Request, Response } from 'express';
import { create, destroy, get, edit, update} from "@services/billsoftadmin/selling-product/product-services";
import { UploadedFile } from "express-fileupload";
import { Product } from '@models/billsoftadmin/selling-product/product-model';
import { putObject } from 'utils/putObject';


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
// export const createController = async (req: Request, res: Response): Promise<void> => {
//   console.log(req.body , "req")
//   try {
//     const created = await create(req.body);
//     console.log("Product Created Successfully:", created);
//     res.status(200).json(created);
//   } catch (error) {
//     console.error("Error creating Product:", error);
//     res.status(500).json({ message: "Failed to create Product" });
//   }
//   };

export const createController = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      ProdId,
      ProductName,
      BrandId,
      CatId,
      SubCatId,
      Status,
      SrNo,
      code,
      CreatedBy,
      ModifiedBy,
      StockQty,
      TempPrdId,
      Display,
      push_flag,
      delete_flag,
      ProdType,
      Qty,
      Unit,
      Transfer,
      Assets,
      QrDisplay,
      MinQty,
      ProdType2,
      PurchasePrice,
      checkstatus,
      tempstatus,
    } = req.body;

    const file = req.files?.Photo as UploadedFile;
    let photoUrl = null;
    let s3Key = null;

    if (file) {
      const fileName = `uploads/products/${Date.now()}_${file.name}`;
      const result = await putObject(file.data, fileName, file.mimetype);
      if (!result) {
        return res.status(500).json({ message: "Failed to upload product image to S3." });
      }
      photoUrl = result.url;
      s3Key = result.key;
    }

    const newProduct = await Product.create({
      ProdId,
      ProductName,
      BrandId,
      CatId,
      SubCatId,
      Status: Number(Status),
      SrNo: Number(SrNo),
      Photo: photoUrl,
      code,
      CreatedDate: new Date(),
      ModifiedDate: null,
      CreatedBy: Number(CreatedBy),
      ModifiedBy: Number(ModifiedBy),
      StockQty: Number(StockQty),
      TempPrdId: Number(TempPrdId),
      Display: Number(Display),
      push_flag: Number(push_flag),
      delete_flag: Number(delete_flag),
      ProdType: Number(ProdType),
      Qty,
      Unit,
      Transfer: Number(Transfer),
      Assets: Number(Assets),
      QrDisplay,
      MinQty,
      ProdType2: Number(ProdType2),
      PurchasePrice: Number(PurchasePrice),
      checkstatus: Number(checkstatus),
      tempstatus: Number(tempstatus),
    });

    return res.status(200).json({ message: "Product created successfully", data: newProduct });
  } catch (error) {
    console.error("Product Create Error:", error);
    return res.status(500).json({ message: "Internal server error", error });
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

  