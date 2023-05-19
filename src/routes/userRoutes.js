import { Router } from 'express';
import userController from '../controllers/UserController';
import login from '../middlewares/login';

const router = new Router();

// router.get('/', login, userController.index);
// router.get('/:id', userController.show);

router.post('/', userController.store);
router.put('/', login, userController.update);
router.delete('/', login, userController.delete);

export default router;
