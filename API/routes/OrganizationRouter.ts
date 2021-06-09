import { Router } from 'express';
import { getUsersOrganization } from '../controllers/OrganizationController';
import { isAdmin } from '../middleware/IsAdmin';

const router = Router();

router.get('/users', isAdmin, getUsersOrganization);

export default router;