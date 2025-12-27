import { Router } from 'express';
import { getCategories, createCategory, deleteCategory } from '../controllers/categoryController.js';
// Importamos los middlewares
import { authRequired } from '../middlewares/authMiddleware.js';
import { validateSchema } from '../middlewares/validatorMiddleware.js';
// Importamos el esquema (está en product.schema.js según lo que definimos antes)
import { createCategorySchema } from '../schemas/productSchema.js'; 

const router = Router();

// Público: Todo el mundo puede ver las categorías
router.get('/', getCategories);

// Privado: Solo Admin crea categorías + Validación Zod
router.post('/', authRequired, validateSchema(createCategorySchema), createCategory);

// Privado: Solo Admin borra
router.delete('/:id', authRequired, deleteCategory);

export default router;