import dotenv from 'dotenv';

// Cargar las variables del archivo .env
dotenv.config();

// Exportamos las variables limpias
export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;

// Validación rápida: Si faltan variables críticas, avisamos al iniciar
if (!MONGO_URI) {
    console.error("❌ FATAL ERROR: La variable MONGO_URI no está definida.");
    process.exit(1);
}