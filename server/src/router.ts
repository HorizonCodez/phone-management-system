import { Router } from 'express';
import authRouter from './features/auth/auth.router';
import itemRouter from './features/item/item.router';
import phoneShopRouter from './features/phone-shop/phone-shop.router';

const router = Router();
const API_PREFIX = '/api';

router.use(`${API_PREFIX}/auth`, authRouter);
router.use(`${API_PREFIX}/phone-shop`, phoneShopRouter);
router.use(`${API_PREFIX}/item`, itemRouter);

export default router;
