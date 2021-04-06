import { Router } from 'express';
const router = Router();

import { login, register, getUser } from '../controllers/userController';
import { isAuth } from '../middleware/isAuth';

router.post('/login', login);
router.post('/register', register);
router.get('/:id', isAuth, getUser);
// router.put('/:id', userController.putUser);
// router.delete('/:id', userController.deleteUser);

export default router;