import { Router } from 'express';
import { createUser, listUsers, getUser } from '../controllers/userController';

const router = Router();

router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', createUser);

export default router;
