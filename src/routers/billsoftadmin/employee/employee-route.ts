import { Router } from 'express';
import { createController, deleteController, getController, editController, updateController,loginController } from '@controllers/billsoftadmin/employee/employee-controller';
import fileUpload from "express-fileupload"

const router = Router();

router.get('/employee/get/:roll', getController);
router.post("/employee/create",fileUpload(), createController);
router.get("/employee/edit/:id", editController);
router.put("/employee/update/:id",fileUpload(), updateController);
router.delete("/employee/delete/:id", deleteController);
router.get('/employee/login/:Phone', loginController);
export default router;