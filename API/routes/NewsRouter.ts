import { Router } from 'express';
import { deleteNews, getAllNews, getNews, postNews } from '~/controllers/NewsController';
import { isAdmin } from '~/middleware/IsAdmin';

const router = Router();


router.post('/', isAdmin, postNews);
router.get('/', getAllNews);
router.get('/:id', getNews);
router.delete('/:id', isAdmin, deleteNews);
// router.post('/', postTag);
// router.get('/', getTags);
// router.get('/:id', getTag);
// router.put('/:id', putTag);
// router.delete('/:id', deleteTag);

export default router;