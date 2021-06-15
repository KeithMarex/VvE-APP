import { Router } from 'express';
import { login, register, getUsers, getUser, deleteUser, putUser } from '../controllers/UserController';
import { isAuth } from '../middleware/IsAuth';
import { isAdmin } from '../middleware/IsAdmin';

const router = Router();

router.post('/login', login);
router.post('/register', isAuth, isAdmin, register);
router.get('/', isAuth, getUsers);
router.get('/:id', isAuth, getUser);
router.put('/:id', putUser);
router.delete('/:id',isAuth, isAdmin, deleteUser);

export default router;