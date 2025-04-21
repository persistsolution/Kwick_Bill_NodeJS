import { Router } from 'express';
import { createController, deleteController, getController, editController, updateController,getListController } from '@controllers/billsoftadmin/selling-product/subcategory-controller';

const router = Router();

router.get('/selling-product/subcategory/get/:ProdType', getController);
router.post("/selling-product/subcategory/create", createController);
router.get("/selling-product/subcategory/edit/:id", editController);
router.put("/selling-product/subcategory/update/:id", updateController);
router.delete("/selling-product/subcategory/delete/:id", deleteController);
router.get('/selling-product/subcategory/getsubcategory/:CatId', getListController);

export default router;