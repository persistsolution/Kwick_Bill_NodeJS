import { Router } from 'express';
import { createController, deleteController, getController, editController, updateController } from '@controllers/billsoftadmin/selling-product/brand-controller';

const router = Router();

router.get('/selling-product/brand/get', getController);
router.post("/selling-product/brand/create", createController);
router.get("/selling-product/brand/edit/:id", editController);
router.put("/selling-product/brand/update/:id", updateController);
router.delete("/selling-product/brand/delete/:id", deleteController);

export default router;

