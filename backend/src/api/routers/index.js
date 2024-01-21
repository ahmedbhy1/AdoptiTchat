import { Router } from 'express';
import UserRouter from './user.router.js';
import AuthRouter from './auth.router.js';
import CatRouter from './cat.router.js';

const router = Router();
router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/cats', CatRouter);
export default router;