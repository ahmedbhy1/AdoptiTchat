import { Router } from 'express';
import { CatController } from '../controllers/index.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { UserRole } from '../core/UserRole.js';

const router = Router();
const catController = new CatController();
router.get('/:id', authenticate(), (req, res, next) => catController.getCat(req, res, next));
router.get('/', authenticate(), (req, res, next) => catController.getCats(req, res, next));

router.use(authenticate(UserRole.Admin));
router.get('/countCatAdoption/:id', (req, res, next) => catController.countCatAdoptionRequests(req, res, next));
router.post('/approveAdoption', (req, res, next) => catController.approveAdoptionRequest(req, res, next));
router.put('/:id', (req, res, next) => catController.updateCat(req, res, next));
router.delete('/:id', (req, res, next) => catController.deleteCat(req, res, next));
router.post('/', (req, res, next) => catController.addCat(req, res, next));
export default router;