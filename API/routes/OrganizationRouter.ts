import { Router } from 'express';
import { getUsersOrganization, getOrganizationTheme } from '../controllers/OrganizationController';
import { isAdmin } from '../middleware/IsAdmin';

const router = Router();

router.get('/users', isAdmin, getUsersOrganization);
router.get('/theme', isAdmin, getOrganizationTheme)

export default router;