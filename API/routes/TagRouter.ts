import { Router } from 'express';
import { postTag, getTags, getTag, putTag, deleteTag } from '../controllers/TagController';

const router = Router();

router.post('/', postTag);
router.get('/', getTags);
router.get('/:id', getTag);
router.put('/:id', putTag);
router.delete('/:id', deleteTag);

export default router;