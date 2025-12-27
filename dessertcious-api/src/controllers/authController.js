import User from '../models/users.js';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js'; // Usamos la variable centralizada

export const register = async (req, res) => {
    // NOTA: Ya no hay 'schema.safeParse'. Si llegamos aquí, los datos son válidos.
    try {
        const { email, password, nombre } = req.body; 

        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json({ message: ["El email ya está en uso"] });

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            nombre,
            email,
            password: passwordHash
        });

        const userSaved = await newUser.save();

        const token = jwt.sign(
            { id: userSaved._id },
            JWT_SECRET, 
            { expiresIn: "1d" } 
        );

        res.json({
            id: userSaved._id,
            nombre: userSaved.nombre,
            email: userSaved.email,
            token: token
        });

    } catch (error) {
        // El error 500 ahora lo podría manejar el middleware, pero dejarlo así está bien por ahora
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: ["Usuario no encontrado"] });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: ["Contraseña incorrecta"] });

        const token = jwt.sign(
            { id: userFound._id },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            id: userFound._id,
            nombre: userFound.nombre,
            email: userFound.email,
            token: token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyToken = async (req, res) => {
    try {
        // El middleware 'authRequired' ya puso el usuario en req.user
        // Pero para estar seguros, buscamos los datos frescos en la BD
        const userFound = await User.findById(req.user.id);

        if (!userFound) return res.status(401).json({ message: "Usuario no autorizado" });

        return res.json({
            id: userFound._id,
            nombre: userFound.nombre,
            email: userFound.email,
            // No necesitamos mandar el token de nuevo, ya lo tienen
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};