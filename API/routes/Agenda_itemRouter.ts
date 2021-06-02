import { Router } from 'express';
import { deleteAgenda, getAgenda, postAgenda, putAgenda } from '~/controllers/AgendaController';
import { isAdmin } from '~/middleware/IsAdmin';

const router = Router();

router.post('/', isAdmin, postAgenda);
router.get('/:month', getAgenda);
router.put('/:id', isAdmin, putAgenda);
router.delete('/:id', isAdmin, deleteAgenda);

export default router;