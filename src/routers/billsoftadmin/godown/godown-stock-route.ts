import { Router } from 'express';
import { getController,getStockProdController,getStockProdDetailsController,createController} from '@controllers/billsoftadmin/godown/godown-stock-controller';

const router = Router();

router.get('/godown/stock/get', getController);
router.get('/godown/stock/getstockprod', getStockProdController);
router.get('/godown/stock/getstockproddetails/:pid/:godownid', getStockProdDetailsController);
router.post('/godown/stock/create', createController);

export default router;