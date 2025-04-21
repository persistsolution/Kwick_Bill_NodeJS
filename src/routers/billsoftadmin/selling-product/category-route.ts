import { Router } from 'express';
import { createController, deleteController, getController, editController, updateController,getListController } from '@controllers/billsoftadmin/selling-product/category-controller';
import fileUpload from "express-fileupload"

const router = Router();

router.get('/selling-product/category/get/:ProdType', getController);
router.post("/selling-product/category/create",fileUpload() ,createController);
router.get("/selling-product/category/edit/:id", fileUpload(),editController);
router.put("/selling-product/category/update/:id",fileUpload(), updateController);
router.delete("/selling-product/category/delete/:id",fileUpload(), deleteController);
router.get('/selling-product/category/getlist/:ProdType',fileUpload(), getListController);


export default router;

