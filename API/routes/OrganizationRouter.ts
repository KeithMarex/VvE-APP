import { Router } from 'express';
import { getUsersOrganization } from '../controllers/OrganizationController';
import { isAuth } from '../middleware/IsAuth';
import { isAdmin } from '../middleware/IsAdmin';

const router = Router();

router.get('/users', isAuth, isAdmin, getUsersOrganization);

export default router;