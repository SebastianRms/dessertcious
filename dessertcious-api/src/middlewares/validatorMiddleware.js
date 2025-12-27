import { ZodError } from 'zod';

export const validateSchema = (schema) => (req, res, next) => {
    try {
        // Estructura estándar para Zod en Express
        const dataToValidate = {
            body: req.body,
            query: req.query,
            params: req.params
        };

        schema.parse(dataToValidate);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: "Error en los datos enviados",
                errors: error.errors.map((issue) => 
                    `${issue.path[1] || issue.path[0]}: ${issue.message}`
                )
            });
        }
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};