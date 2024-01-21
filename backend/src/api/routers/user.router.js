import { Router } from 'express';
import { UserController } from '../controllers/index.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { UserRole } from '../core/UserRole.js';

const router = Router();
const userController = new UserController();

router.get('/', authenticate(UserRole.Admin), userController.getUsers);
router.use(authenticate(UserRole.Client));
router.get('/favouriteCats', userController.getUserFavoriteCats);
router.post('/addCatToFavourites', userController.addCatToUserFavorites);
router.patch('/deleteCatFromFavourites', userController.deleteCatFromFavorisOfUser);
router.post('/requestCatAdoption', userController.requestCatAdoptionFromUser);
router.post('/cancelCatAdoptionRequest', userController.cancelCatAdoptionFromUser);
export default router;