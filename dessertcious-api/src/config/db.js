import mongoose from 'mongoose';
import { MONGO_URI } from './config.js'; // <--- Importamos desde nuestra config central

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI); // <--- Usamos la variable limpia
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error de conexión: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;