import { Router } from 'express';
import formidableMiddleware  from 'express-formidable'
import { postTicket, getTickets, getTicket, putTicket } from '../controllers/TicketController';
import { imagesConvert } from '~/middleware/ImagesConverting';

const router = Router();

router.post('/', formidableMiddleware(), imagesConvert, postTicket);
router.get('/', getTickets);
router.get('/:id', getTicket);
router.put('/:id', putTicket);

export default router;