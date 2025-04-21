import { Router } from 'express';
import { getController,createController} from '@controllers/billsoftadmin/godown/transfer-stock-controller';

const router = Router();

router.get('/godown/transferstock/get/:OwnShop', getController);
router.post('/godown/transferstock/create', createController);

export default router;