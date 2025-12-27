import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const errorHandler = (err, req, res, next) => {
  // Ajustamos la ruta para salir de src/middlewares/ hasta la raíz
  const logFilePath = path.join(__dirname, '../../logs/error.log');
  const dateTime = new Date();
  const logMessage = `${dateTime.toISOString()} | ${req.method} ${req.url} | ${err.message} | ${err.stack}\n`;

  // Crear directorio logs si no existe
  const logDir = path.dirname(logFilePath);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  // Escribir en el archivo (asíncrono para no bloquear el servidor)
  fs.appendFile(logFilePath, logMessage, (fsErr) => {
    if (fsErr) console.error('Error escribiendo log:', fsErr);
  });

  console.error(`❌ Error: ${err.message}`);

  // Responder al cliente
  if (!res.headersSent) {
    res.status(500).json({
      message: 'Error Interno del Servidor',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};