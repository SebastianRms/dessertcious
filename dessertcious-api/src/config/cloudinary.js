import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// 1. Configuración con tus credenciales (OJO: Lo ideal es usar variables de entorno .env, pero por ahora ponlas aquí para probar)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// 2. Configurar el almacenamiento
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'dessertcious_products', // Nombre de la carpeta en tu nube
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // Formatos permitidos
    },
});

// 3. Crear el middleware para usar en las rutas
export const uploadImage = multer({ storage: storage });