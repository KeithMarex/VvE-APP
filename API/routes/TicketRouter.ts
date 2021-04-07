import { Router } from 'express';
import { postTicket, getTickets, getTicket, putTicket, deleteTicket } from '../controllers/TicketController';

const router = Router();

router.post('/ticket', postTicket);
router.get('/', getTickets);
router.get('/:id', getTicket);
router.put('/:id', putTicket);
router.delete('/:id', deleteTicket);

export default router;