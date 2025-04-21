import { Router } from 'express';
import { getController } from '@controllers/billsoftadmin/masters/unit-controller';

const router = Router();

router.get('/masters/unit/get', getController);
export default router;

