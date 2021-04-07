import { Router } from 'express';
import { postTicket, getTickets, getTicket, putTicket } from '../controllers/TicketController';

const router = Router();

router.post('/ticket', postTicket);
router.get('/', getTickets);
router.get('/:id', getTicket);
router.put('/:id', putTicket);

export default router;