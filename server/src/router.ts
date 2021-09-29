import { Router } from 'express';
import authRouter from './features/auth/auth.router';
import phoneShopRouter from './features/phone-shop/phone-shop.router';

const router = Router();
const API_PREFIX = '/api';

router.use(`${API_PREFIX}/auth`, authRouter);
router.use(`${API_PREFIX}/phone-shop`, phoneShopRouter);

export default router;
