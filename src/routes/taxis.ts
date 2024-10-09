//ruta de los taxis
import { Router } from 'express';
import { getAllTaxis } from '../controllers/taxisController';

const router: Router = Router();

// Ruta para obtener todos los taxis
router.get('/', getAllTaxis);

export default router;
