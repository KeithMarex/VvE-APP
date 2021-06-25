import { Router } from 'express';
import { deleteNews, getAllNews, getNews, postNews, putNews } from '~/controllers/NewsController';
import { imagesConvert } from '~/middleware/ImagesConverting';
import formidableMiddleware  from 'express-formidable'
import { isAdmin } from '~/middleware/IsAdmin';

const router = Router();


router.post('/', formidableMiddleware(), imagesConvert, isAdmin, postNews);
router.get('/', getAllNews);
router.get('/:id', getNews);
router.put('/:id', formidableMiddleware(), imagesConvert, isAdmin, putNews);
router.delete('/:id', isAdmin, deleteNews);

export default router;