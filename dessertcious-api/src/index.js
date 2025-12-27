import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { PORT } from './config/config.js';
import routes from './routes/index.js'; // Importamos el manejador de rutas principal

// Importamos tus nuevos middlewares globales
import { requestLogger } from './middlewares/loggerMiddlware.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

const app = express();

// 1. Configuraciones Globales
app.use(cors()); // Permite Angular
app.use(express.json()); // Permite leer JSON

// 2. Logger (Registra cada petición que entra)
app.use(requestLogger);

// 3. Base de Datos
connectDB();

// 4. Rutas (Todo empieza con /api)
// Asegúrate de tener creado src/routes/index.js como acordamos
app.use('/api', routes); 

// 5. Manejo de Errores (Va al FINAL, para atrapar lo que falle arriba)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor de Dessertcious corriendo en http://localhost:${PORT}/api`);
});