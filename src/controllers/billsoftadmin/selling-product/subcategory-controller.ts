import { Request, Response } from 'express';
import { create, destroy, get, edit, update, getSubCategory} from "@services/billsoftadmin/selling-product/subcategory-services";
import { putObject } from 'utils/putObject';
import { SubCategory } from '@models/billsoftadmin/selling-product/subcategory-model';
import { UploadedFile } from "express-fileupload";
import { deleteObject } from 'utils/deleteObject';


export interface DeleteResponse {
  success: boolean;
  message: string;
  details?: {
    databaseDeleted?: boolean;
    s3Key?: string;
    s3Deleted?: boolean;
  };
}

// Get all Category
export const getController = async (req: Request, res: Response): Promise<void> => {
    try {
      const listed = await get(Number(req.params.ProdType));
      res.json(listed);
    } catch (error) {
      console.error("Error fetching Category:", error);
      res.status(500).json({ message: "Failed to fetch Category" });
    }
  };

// Create Category
export const createController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { CatId, Name, Status, FrId, ProdType, CreatedBy, ModifiedBy } = req.body;
    const file = req.files?.Photo as UploadedFile;
    let photoUrl: string | null = null;

    if (file) {
      const fileName = `uploads/${Date.now()}_${file.name}`;
      const result = await putObject(file.data, fileName, file.mimetype);
      if (!result) {
        return res.status(500).json({ message: 'Failed to upload image to S3.' });
      }
      photoUrl = result.url;
    }

    const newSubCategory = await SubCategory.create({
      CatId: Number(CatId),
      Name: Name || null,
      Photo: photoUrl,
      Status: Number(Status),
      FrId: Number(FrId),
      ProdType: Number(ProdType),
      CreatedBy: Number(CreatedBy),
      ModifiedBy: Number(ModifiedBy),
      CreatedDate: new Date(),
      ModifiedDate: null,
    });

    return res.status(200).json({
      message: 'SubCategory created successfully',
      data: newSubCategory,
    });

  } catch (error) {
    console.error('Create SubCategory Error:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

 // Get Category by ID
export const editController = async (req: Request, res: Response): Promise<void> => {
  try {
    const edited = await edit(Number(req.params.id));
    if (!edited) {
      res.status(404).json({ message: "Category not found" });
    } else {
      res.json(edited);
    }
  } catch (error) {
    console.error("Error fetching Category by ID:", error);
    res.status(500).json({ message: "Failed to fetch Category" });
  }
};

// Update Category
export const updateController = async (req: Request, res: Response): Promise<void> => {
  try {
    const subCategoryId = Number(req.params.id);
    if (isNaN(subCategoryId)) {
      res.status(400).json({ message: 'Invalid SubCategory ID' });
      return;
    }

    const subCategory = await SubCategory.findByPk(subCategoryId);
    if (!subCategory) {
      res.status(404).json({ message: 'SubCategory not found' });
      return;
    }

    const {
      CatId,
      Name,
      Status,
      FrId,
      ProdType,
      CreatedBy,
      ModifiedBy,
      CreatedDate,
      ModifiedDate,
    } = req.body;

    let photoUrl = subCategory.dataValues.Photo;
    const file = req.files?.Photo as UploadedFile;
    if (file) {
      if (photoUrl) {
        try {
          const urlParts = new URL(photoUrl);
          const s3Key = decodeURIComponent(urlParts.pathname.slice(1)); 
          const deleteResult = await deleteObject(s3Key);
          if (!deleteResult.success) {
            console.warn(`Failed to delete old image from S3: ${s3Key}`, deleteResult.message);
          }
        } catch (err) {
          console.error('Error parsing old image URL:', err);
        }
      }
      const newFileName = `uploads/${Date.now()}_${file.name}`;
      const uploadResult = await putObject(file.data, newFileName, file.mimetype);
      if (!uploadResult) {
        res.status(500).json({ message: 'Failed to upload image to S3' });
        return;
      }
      photoUrl = uploadResult.url;
    }
    const updatedSubCategory = await subCategory.update({
      CatId: Number(CatId),
      Name: Name || null,
      Photo: photoUrl,
      Status: Number(Status),
      FrId: Number(FrId),
      ProdType: Number(ProdType),
      CreatedBy: Number(CreatedBy),
      ModifiedBy: Number(ModifiedBy),
      CreatedDate: CreatedDate || subCategory.dataValues.CreatedDate,
      ModifiedDate: ModifiedDate || new Date(),
    });

    res.status(200).json({
      message: 'SubCategory updated successfully',
      data: updatedSubCategory,
    });
  } catch (error) {
    console.error('Error updating SubCategory:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// Delete Category
export const deleteController = async (req: Request, res: Response): Promise<void> => {
  const response: DeleteResponse = {
    success: false,
    message: 'Deletion process started'
  };

  try {
    const subCategoryId = Number(req.params.id);
    if (isNaN(subCategoryId)) {
      response.message = 'Invalid subcategory ID';
      res.status(400).json(response);
      return;
    }

    const subCategory = await SubCategory.findByPk(subCategoryId);
    if (!subCategory) {
      response.message = 'SubCategory not found';
      res.status(404).json(response);
      return;
    }

    const photoUrl = subCategory.dataValues?.Photo;
    let s3Key: string | null = null;

    if (photoUrl) {
      try {
        const urlParts = new URL(photoUrl);
        s3Key = decodeURIComponent(urlParts.pathname.slice(1)); // remove leading `/`

        if (!s3Key.startsWith('uploads/')) {
          console.warn(`S3 key format unexpected: ${s3Key}`);
        }
      } catch (err) {
        console.error('URL parsing error:', err);
      }
    }

    await subCategory.destroy();
    response.success = true;
    response.message = 'SubCategory deleted successfully';
    response.details = {
      databaseDeleted: true,
      s3Key: s3Key || undefined
    };

    if (s3Key) {
      const s3Result = await deleteObject(s3Key);
      response.details.s3Deleted = s3Result.success;

      if (!s3Result.success) {
        console.warn(`S3 deletion failed for ${s3Key}:`, s3Result.message);
        response.message += ' (S3 cleanup failed)';
      } else {
        response.message += ' with S3 cleanup';
      }
    }
    res.status(200).json(response);
  } catch (error) {
    console.error('Deletion error:', error);
    response.message = 'Failed to complete deletion process';

    if (error instanceof Error) {
      response.message += `: ${error.message}`;
    }

    res.status(500).json(response);
  }
};

//get Sub category depend on category
export const getListController = async (req: Request, res: Response): Promise<void> => {
  try {
    const listed = await getSubCategory(Number(req.params.CatId));
    res.json(listed);
  } catch (error) {
    console.error("Error fetching Sub Catgeory:", error);
    res.status(500).json({ message: "Failed to fetch Sub Catgeory" });
  }
};
  