import { Router } from 'express';
import { login, register, getUsers, getUser, getUsersOrganization } from '../controllers/UserController';
import { isAuth } from '../middleware/IsAuth';
import { isAdmin } from '../middleware/IsAdmin';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/', isAuth, getUsers);
router.get('/:id', isAuth, getUser);
router.get('/organization', isAuth, isAdmin, getUsersOrganization)
// router.put('/:id', userController.putUser);
// router.delete('/:id', userController.deleteUser);

export default router;