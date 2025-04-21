import { Router } from 'express';
import { getController,createController,editController,deleteController,updateController} from '@controllers/billsoftadmin/godown/godown-controller';

const router = Router();

router.get('/godown/account/get/:Roll', getController);
router.post('/godown/account/create', createController);
router.get("/godown/account/edit/:id", editController);
router.delete("/godown/account/delete/:id", deleteController);
router.put("/godown/account/update/:id", updateController);


export default router;