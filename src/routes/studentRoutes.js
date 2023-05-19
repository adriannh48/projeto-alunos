import { Router } from 'express';
import StudentController from '../controllers/StudentController';
import login from '../middlewares/login';

const router = new Router();

router.get('/', StudentController.index);
router.get('/:id', StudentController.show);

router.post('/', login, StudentController.store);
router.put('/:id', login, StudentController.update);
router.delete('/:id', login, StudentController.delete);

export default router;
