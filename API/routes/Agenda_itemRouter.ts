import { Router } from 'express';
import { getAgenda, postAgenda } from '~/controllers/AgendaController';

const router = Router();

router.post('/', postAgenda);
router.get('/:from/:to', getAgenda);
// router.get('/:id', getTicket);
// router.put('/:id', putTicket);

export default router;