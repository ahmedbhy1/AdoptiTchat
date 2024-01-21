import { Router } from 'express';
import { UserController } from '../controllers/index.js';

const router = Router();
const userController = new UserController();
router.get('/:email', (req, res, next) => userController.getUser(req, res, next));
router.get('/favouriteCats/:id', (req, res, next) => userController.getFavoriteCatsOfUser(req, res, next));
router.post('/addCatToFavourites/:id', (req, res, next) => userController.addCatToFavorisOfUser(req, res, next));
router.patch('/deleteCatFromFavourites/:id', (req, res, next) => userController.deleteCatFromFavorisOfUser(req, res, next));
router.post('/requestCatAdoption/:id', (req, res, next) => userController.requestCatAdoptionFromUser(req, res, next));
router.post('/cancelCatAdoptionRequest/:id', (req, res, next) => userController.requestCatAdoptionFromUser(req, res, next));
export default router;