import User from '../models/User.js';
import { registerSchema, loginSchema } from '../schemas/authSchema.js'; 
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ 
            message: "Error en los datos",
            errors: result.error.issues.map(issue => issue.message) 
        });
    }

    try {
        const { email, password, nombre } = result.data; 

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
            process.env.JWT_SECRET, 
            { expiresIn: "1d" } 
        );

        res.json({
            id: userSaved._id,
            nombre: userSaved.nombre,
            email: userSaved.email,
            token: token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ 
            message: "Datos inválidos",
            errors: result.error.issues.map(issue => issue.message) 
        });
    }

    try {
        const { email, password } = result.data;

        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: ["Usuario no encontrado"] });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: ["Contraseña incorrecta"] });

        const token = jwt.sign(
            { id: userFound._id },
            process.env.JWT_SECRET,
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