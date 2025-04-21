import { Router } from 'express';
import { getOwnFrController, createController, deleteController, getController, editController, updateController,getAllocateRawIdController } from '@controllers/billsoftadmin/franchise/franchise-controller';

const router = Router();

router.get('/franchise/get/:Roll', getController);
router.post("/franchise/create", createController);
router.get("/franchise/edit/:id", editController);
router.put("/franchise/update/:id", updateController);
router.delete("/franchise/delete/:id", deleteController);
router.get("/franchise/getallocaterawid/:id", getAllocateRawIdController);
router.get('/franchise/getownfr/:OwnFranchise', getOwnFrController);

export default router;