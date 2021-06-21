import { Router } from 'express';
import { deleteNews, getAllNews, getNews, postNews } from '~/controllers/NewsController';
import { isAdmin } from '~/middleware/IsAdmin';

const router = Router();


router.post('/', isAdmin, postNews);
router.get('/', getAllNews);
router.get('/:id', getNews);
router.delete('/:id', isAdmin, deleteNews);

export default router;