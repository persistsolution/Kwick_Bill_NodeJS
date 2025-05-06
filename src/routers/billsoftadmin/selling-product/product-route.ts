import { Router } from 'express';
import { createController, deleteController, getController, editController, updateController} from '@controllers/billsoftadmin/selling-product/product-controller';
import fileUpload from "express-fileupload"

const router = Router();

router.get('/selling-product/product/get/:ProdType', getController);
router.post("/selling-product/product/create",fileUpload() , createController);
router.get("/selling-product/product/edit/:id", editController);
router.put("/selling-product/product/update/:id", updateController);
router.delete("/selling-product/product/delete/:id", deleteController);


export default router;