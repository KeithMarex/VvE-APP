import { Router } from 'express';
import { getUsersOrganization, getOrganizationTheme, putOrganizationTheme } from '../controllers/OrganizationController';
import { isAdmin } from '../middleware/IsAdmin';

const router = Router();

router.get('/users', isAdmin, getUsersOrganization);
router.get('/theme', getOrganizationTheme)
router.put('/theme', putOrganizationTheme)

export default router;