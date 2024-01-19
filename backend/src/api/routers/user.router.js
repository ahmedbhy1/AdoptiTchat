import { Router } from 'express';
import { UserController } from '../controllers/index.js';

const router = Router();
const userController = new UserController();
router.get('/:email', (req, res, next) => userController.getUser(req, res, next));
export default router;