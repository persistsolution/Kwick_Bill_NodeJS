import { Router } from 'express';
import { getController,createController,editController,deleteController,getMakingProdController,allocateRawProdController} from '@controllers/billsoftadmin/raw-product/product-controller';
import fileUpload from "express-fileupload"


const router = Router();

router.get('/raw-product/product/get/:ProdType', getController);
router.post('/raw-product/product/create', fileUpload() , createController);
router.get("/raw-product/product/edit/:id", editController);
router.delete("/raw-product/product/delete/:id", deleteController);
router.get("/raw-product/product/getprodlist", getMakingProdController);
router.post('/raw-product/product/allocaterawprod', allocateRawProdController);

export default router;