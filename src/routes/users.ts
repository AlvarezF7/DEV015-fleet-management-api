import { Router } from 'express';
import { createUser } from '../controllers/usersController';

const router: Router = Router();

// Ruta para crear los usuarios
router.post('/', createUser);

export default router;