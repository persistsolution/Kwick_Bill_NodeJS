import { Router } from 'express';
import { createController, deleteController, getController, editController, updateController,getListController } from '@controllers/billsoftadmin/selling-product/subcategory-controller';
import fileUpload from "express-fileupload"
const router = Router();

router.get('/selling-product/subcategory/get/:ProdType', getController);
router.post("/selling-product/subcategory/create",fileUpload() , createController);
router.get("/selling-product/subcategory/edit/:id", editController);
router.put("/selling-product/subcategory/update/:id",fileUpload(), updateController);
router.delete("/selling-product/subcategory/delete/:id", deleteController);
router.get('/selling-product/subcategory/getsubcategory/:CatId', getListController);

export default router;