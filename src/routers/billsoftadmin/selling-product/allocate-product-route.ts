import { Router } from 'express';
import { getController, updateController} from '@controllers/billsoftadmin/selling-product/allocate-product-controller';

const router = Router();

router.get('/selling-product/allocate-product/get/:CreatedBy', getController);
router.post("/selling-product/allocate-product/update", updateController);


export default router;