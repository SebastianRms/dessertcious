import { Router } from 'express';
import { register, login, verifyToken } from '../controllers/authController.js';
// Importamos los middlewares y esquemas
import { validateSchema } from '../middlewares/validatorMiddleware.js';
import { registerSchema, loginSchema } from '../schemas/authSchema.js'; // Asegúrate que el nombre del archivo sea correcto
import { authRequired } from '../middlewares/authMiddleware.js';

const router = Router();

// El middleware se ejecuta ANTES de llegar al controlador
router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.get('/verify', authRequired, verifyToken);

export default router;