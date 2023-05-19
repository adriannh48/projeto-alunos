import { Router } from 'express';
import PictureController from '../controllers/PictureController';
import login from '../middlewares/login';

const router = new Router();

router.post('/', login, PictureController.store);

export default router;
