import { Router } from 'express';
import formidableMiddleware  from 'express-formidable'
import { imagesConvert } from '~/middleware/ImagesConverting';

import { postComment } from '../controllers/CommentController';

const router = Router();

router.post('/', formidableMiddleware(), imagesConvert, postComment);

export default router;