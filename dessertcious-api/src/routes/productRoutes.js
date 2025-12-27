import { Router } from "express";
import {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";
// Importamos Auth y Validator
import { authRequired } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { createProductSchema } from "../schemas/productSchema.js";
import { uploadImage } from "../config/cloudinary.js";

const router = Router();

// Rutas Públicas (Cualquiera puede ver el menú)
router.get("/", getProducts);
router.get("/:id", getProductById);

// Rutas Privadas (Solo Admin con Token puede crear/borrar)
router.post(
  "/",
  authRequired,
  uploadImage.single("image"),
  validateSchema(createProductSchema),
  createProduct
);
router.delete("/:id", authRequired, deleteProduct);
router.put("/:id", authRequired, uploadImage.single('image'),updateProduct); // Actualizar

export default router;
