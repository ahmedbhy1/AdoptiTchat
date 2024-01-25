import { Router } from 'express';
import { UserController } from '../controllers/index.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { UserRole } from '../core/UserRole.js';

const router = Router();
const userController = new UserController();

router.get('/', authenticate(UserRole.Admin), userController.getUsers);
router.use(authenticate(UserRole.Client));
router.get('/favouriteCats', userController.getUserFavoriteCats);
router.get('/favouriteCatsIds', userController.getUserFavoriteCatsIds);
router.get('/checkIfFavourite/:catIs', userController.checkIfFavourite)
router.post('/addCatToFavourites', userController.addCatToUserFavorites);
router.patch('/deleteCatFromFavourites', userController.deleteCatFromFavorisOfUser);
router.get('/checkIfRequestedForAdoption/:catIs', userController.checkIfRequestedForAdoption)
router.post('/requestCatAdoption', userController.requestCatAdoptionFromUser);
router.patch('/cancelCatAdoptionRequest', userController.cancelCatAdoptionFromUser);
export default router;