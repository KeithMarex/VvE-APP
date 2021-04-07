import { Router } from 'express';
import { postTicket, getTicket, putTicket, deleteTicket } from '../controllers/TicketController';

const router = Router();

router.post('/ticket', postTicket);
router.get('/', getTicket);
router.get('/:id', getTicket);
router.put('/:id', putTicket);
router.delete('/:id', deleteTicket);

export default router;