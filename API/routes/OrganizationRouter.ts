import { Router } from 'express';
import { imagesConvert } from '~/middleware/ImagesConverting';
import { getUsersOrganization, getOrganizationTheme, putOrganizationTheme, getOrganization, putOrganization, postFile, getFiles, getFile } from '../controllers/OrganizationController';
import { isAdmin } from '../middleware/IsAdmin';
import formidableMiddleware  from 'express-formidable'

const router = Router();

router.get('/users', isAdmin, getUsersOrganization);
router.get('/', getOrganization);
router.get('/theme', getOrganizationTheme);
router.put('/theme', putOrganizationTheme);
router.put('/', isAdmin, formidableMiddleware(), imagesConvert, putOrganization);

router.post('/file', isAdmin, formidableMiddleware(), postFile);
router.get('/file', getFiles);
router.get('/file/:id', getFile);

export default router;