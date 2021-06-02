import { Router } from 'express';
import { getAgenda, postAgenda } from '~/controllers/AgendaController';
import { isAdmin } from '~/middleware/IsAdmin';

const router = Router();

router.post('/', isAdmin, postAgenda);
router.get('/:month', getAgenda);
// router.get('/:id', getTicket);
// router.put('/:id', putTicket);

export default router;