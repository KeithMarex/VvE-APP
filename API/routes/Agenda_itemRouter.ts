import { Router } from 'express';
import { deleteAgenda, getAgenda, getAgendaDetails, getAgendaNext, postAgenda, putAgenda } from '~/controllers/AgendaController';
import { isAdmin } from '~/middleware/IsAdmin';

const router = Router();

router.get('/next', getAgendaNext);
router.get('/details/:id', getAgendaDetails);
router.get('/:month', getAgenda);
router.post('/', isAdmin, postAgenda);
router.put('/:id', isAdmin, putAgenda);
router.delete('/:id', isAdmin, deleteAgenda);

export default router;