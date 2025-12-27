import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

export const authRequired = (req, res, next) => {
  // A veces el token viene como "Bearer xyz...", quitamos la palabra Bearer
  const token = req.headers['authorization']?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, autorización denegada' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    // Guardamos el usuario decodificado en la petición para usarlo luego
    req.user = decoded;
    next();
  });
};