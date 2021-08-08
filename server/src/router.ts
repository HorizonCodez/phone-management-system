import { Router } from 'express';
import authRouter from './features/auth/auth.router';

const router = Router();
const API_PREFIX = '/api';

router.use(`${API_PREFIX}/auth`, authRouter);

export default router;
