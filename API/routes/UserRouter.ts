import { Router } from 'express';
import { login, logout, register, getUsers, getUser, deleteUser, putUser, resetPassword} from '../controllers/UserController';
import { isAuth } from '../middleware/IsAuth';
import { isAdmin } from '../middleware/IsAdmin';

const router = Router();

router.post('/login', login);
router.post('/logout', logout)
router.post('/register', isAuth, isAdmin, register);
router.post('/reset', resetPassword);
router.get('/', isAuth, getUsers);
router.get('/:id', isAuth, getUser);
router.put('/:id', putUser);
router.delete('/:id',isAuth, isAdmin, deleteUser);

export default router;