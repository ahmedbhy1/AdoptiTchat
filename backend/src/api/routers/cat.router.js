import { Router } from 'express';
import { CatController, UserController } from '../controllers/index.js';

const router = Router();
const chatController = new CatController();
const userController = new UserController();
router.get('/:id', (req, res, next) => chatController.getCat(req, res, next));
router.patch('/:id', (req, res, next) => chatController.updateCat(req, res, next));
router.delete('/:id', (req, res, next) => chatController.deleteCat(req, res, next));
router.get('/', (req, res, next) => chatController.getCats(req, res, next));
router.post('/', (req, res, next) => chatController.addCat(req, res, next));
router.get('/countCatAdoption/:id', (req,res,next) => userController.countCatAdoptionRequests(req, res, next));
export default router;