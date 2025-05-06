import { Request, Response } from 'express';
import { create, destroy, get, edit, update,getList} from "@services/billsoftadmin/selling-product/category-service";
import { v4 as uuidv4 } from "uuid";
import { putObject } from 'utils/putObject';
import { Category } from '@models/billsoftadmin/selling-product/category-model';
import { UploadedFile } from "express-fileupload";
import { deleteObject } from 'utils/deleteObject';


interface DeleteResponse {
  success: boolean;
  message: string;
  details?: {
    databaseDeleted: boolean;
    s3Deleted?: boolean;
    s3Key?: string;
  };
}

// interface UpdateResponse {
//   success: boolean;
//   message: string;
//   data?: {
//     id: number;
//     Name: string;
//     Photo: string | null;
//     Featured: number;
//     ProdType: number;
//     Status: number;
//     srno: number;
//     Roll: number;
//     CreatedBy: number;
//     ModifiedBy: number;
//     push_flag: boolean;
//     delete_flag: boolean;
//     CreatedDate: Date;
//     ModifiedDate: Date | null;
//     modified_time: Date | null;
//   };
//   details?: {
//     oldFileDeleted?: boolean;
//     newFileUploaded?: boolean;
//     oldS3Key?: string;
//     newS3Key?: string;
//     s3OperationError?: string;
//   };
// }

interface UpdateResponse {
  success: boolean;
  message: string;
  data?: any;
  details?: {
    oldFileDeleted?: boolean;
    oldS3Key?: string;
    newFileUploaded?: boolean;
    newS3Key?: string;
    s3OperationError?: string;
  };
}


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
export const createController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Name, Featured, ProdType, Status, srno, Roll, CreatedBy, ModifiedBy, push_flag, delete_flag } = req.body;
    const file = req.files?.Photo as UploadedFile;
    let photoUrl = null;
    let s3Key :any = null;
    if (file) {
      const fileName = `uploads/${Date.now()}_${file.name}`;
      const result = await putObject(file.data, fileName, file.mimetype);
      if (!result) {
        return res.status(500).json({ message: "Failed to upload image to S3." });
      }
      photoUrl = result.url;
      s3Key = result.key;

      console.log(s3Key,  's3Key')
    }

    const newCategory = await Category.create({
      Name,
      Icon: null,
      // s3Key: s3Key,
      Photo: photoUrl,
      Photo2: null,
      Featured: Number(Featured),
      ProdType: Number(ProdType),
      Status: Number(Status),
      srno: Number(srno),
      CreatedDate: new Date(),
      ModifiedDate: null,
      Roll: Number(Roll),
      CreatedBy: Number(CreatedBy),
      ModifiedBy: Number(ModifiedBy),
      push_flag: push_flag === "true",
      delete_flag: delete_flag === "true",
      modified_time: null,
    });

    return res.status(200).json({ message: "Category created successfully", data: newCategory });
  } catch (error) {
    console.error("Create Error:", error);
    return res.status(500).json({ message: "Internal server error", error });
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
  const response: UpdateResponse = {
    success: false,
    message: 'Update process started'
  };

  try {
    const categoryId = Number(req.params.id);
    if (isNaN(categoryId)) {
      response.message = 'Invalid category ID: must be a number';
      return res.status(400).json(response);
    }

    const numericFields = ['Featured', 'ProdType', 'Status', 'srno', 'Roll', 'ModifiedBy'];
    const invalidFields = numericFields.filter(field => {
      const value = req.body[field];
      return value !== undefined && isNaN(Number(value));
    });

    if (invalidFields.length > 0) {
      response.message = `Invalid numeric values for fields: ${invalidFields.join(', ')}`;
      return res.status(400).json(response);
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      response.message = 'Category not found';
      return res.status(404).json(response);
    }

    const { Name, Featured, ProdType, Status, srno, Roll, ModifiedBy, push_flag, delete_flag } = req.body;
    const file = req.files?.Photo as UploadedFile | undefined;

    let oldS3Key: string | null = null;
    let newS3Key: string | null = null;
    let photoUrl = category.dataValues.Photo;
    let s3OperationError: string | undefined;

    if (file) {
      try {
        if (photoUrl) {
          try {
            const urlParts = new URL(photoUrl);
            oldS3Key = decodeURIComponent(urlParts.pathname.slice(1));
          } catch (err) {
            console.error('Error parsing existing photo URL:', err);
            s3OperationError = 'Error parsing existing photo URL';
          }
        }

        const fileName = `uploads/${Date.now()}_${file.name}`;
        const result = await putObject(file.data, fileName, file.mimetype);

        if (!result) throw new Error('Failed to upload new image to S3');

        photoUrl = result.url;
        newS3Key = result.key;

        if (oldS3Key) {
          try {
            await deleteObject(oldS3Key);
            response.details = {
              ...response.details,
              oldFileDeleted: true,
              oldS3Key
            };
          } catch (deleteError) {
            console.error('Error deleting old file from S3:', deleteError);
            s3OperationError = 'Failed to delete old file from S3 (non-critical)';
          }
        }
      } catch (uploadError) {
        console.error('Error uploading new file:', uploadError);
        s3OperationError = 'Failed to upload new file to S3';
        photoUrl = category.Photo;
      }
    }

    const updateData = {
      Name,
      Photo: photoUrl,
      Featured: Featured !== undefined ? Number(Featured) : category.Featured,
      ProdType: ProdType !== undefined ? Number(ProdType) : category.ProdType,
      Status: Status !== undefined ? Number(Status) : category.Status,
      srno: srno !== undefined ? Number(srno) : category.srno,
      Roll: Roll !== undefined ? Number(Roll) : category.Roll,
      ModifiedBy: ModifiedBy !== undefined ? Number(ModifiedBy) : category.ModifiedBy,
      push_flag: push_flag !== undefined ? push_flag === 'true' : category.push_flag,
      delete_flag: delete_flag !== undefined ? delete_flag === 'true' : category.delete_flag,
      ModifiedDate: new Date(),
      modified_time: new Date()
    };

    const updatedCategory = await category.update(updateData);

    response.success = true;
    response.message = 'Category updated successfully';
    response.data = updatedCategory.get({ plain: true });
    response.details = {
      ...response.details,
      newFileUploaded: !!file,
      newS3Key: newS3Key || undefined,
      s3OperationError
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Update error:', error);
    response.message = 'Failed to complete update process';
    if (error instanceof Error) {
      response.message += `: ${error.message}`;
    }
    return res.status(500).json(response);
  }
};

// Delete Category
export const deleteController = async (req: Request, res: Response): Promise<void> => {
  const response: DeleteResponse = {
    success: false,
    message: 'Deletion process started'
  };
  try {
    const categoryId = Number(req.params.id);
    if (isNaN(categoryId)) {
      response.message = 'Invalid category ID';
      res.status(400).json(response);
      return;
    }
    const category = await Category.findByPk(categoryId);
    if (!category) {
      response.message = 'Category not found';
      res.status(404).json(response);
      return;
    }
    const photoUrl = category.dataValues?.Photo;
    let s3Key: string | null = null;
    if (photoUrl) {
      try {
        const urlParts = new URL(photoUrl);
        s3Key = decodeURIComponent(urlParts.pathname.slice(1)); // Handle encoded characters
        
        if (!s3Key.startsWith('uploads/')) {
          console.warn(`S3 key format unexpected: ${s3Key}`);
        }
      } catch (err) {
        console.error('URL parsing error:', err);
      }
    }
    await category.destroy();
    response.success = true;
    response.message = 'Category deleted successfully';
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

export const getListController = async (req: Request, res: Response): Promise<void> => {
  try {
    const listed = await getList(Number(req.params.ProdType));
    res.json(listed);
  } catch (error) {
    console.error("Error fetching Category:", error);
    res.status(500).json({ message: "Failed to fetch Category" });
  }
};
  