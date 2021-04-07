import { Router } from 'express';
import { login, register, getUser } from '../controllers/UserController';
import { isAuth } from '../middleware/isAuth';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/:id', isAuth, getUser);
// router.put('/:id', userController.putUser);
// router.delete('/:id', userController.deleteUser);

export default router;