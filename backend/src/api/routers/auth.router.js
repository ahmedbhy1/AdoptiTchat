import { Router } from 'express';
import { AuthController } from '../controllers/index.js';
import { verifyRefreshToken } from '../middlewares/verifyRefreshToken.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();
const authController = new AuthController();
router.post('/login', (req, res, next) => authController.login(req, res, next));
router.post('/register', (req, res, next) => authController.register(req, res, next));
router.post(
  '/logout',
  authenticate(),
  (req, res, next) => authController.logout(req, res, next)
);
router.post(
  '/refresh-token',
  verifyRefreshToken,
  (req, res, next) => authController.refreshToken(req, res, next)
);
export default router;