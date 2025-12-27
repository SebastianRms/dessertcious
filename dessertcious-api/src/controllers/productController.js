import Product from '../models/Product.js';
import Category from '../models/category.js'; 

export const getProducts = async (req, res) => {
    try {
        const { categoria } = req.query; 
        const filter = {};

        if (categoria) {
            const categoryFound = await Category.findOne({ nombre: categoria });
            if (categoryFound) {
                filter.categoria = categoryFound._id;
            }
        }

        const products = await Product.find(filter).populate('categoria', 'nombre');
        res.json(products);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener productos", error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('categoria', 'nombre');
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    // NOTA: Eliminamos la validación manual. Confiamos en el middleware.
    try {
        const { nombre, descripcion, categoria, sabores, tamanos, disponibilidad} = req.body;

        let imagenUrl = "";
        if (req.file) {
            imagenUrl = req.file.path; // <--- AQUÍ ESTÁ EL LINK DE CLOUDINARY
        }

        const categoryFound = await Category.findById(categoria);
        if (!categoryFound) return res.status(400).json({ message: "La categoría especificada no existe" });

        const newProduct = new Product({
            nombre,
            descripcion,
            categoria: categoryFound._id,
            sabores,
            tamanos,
            disponibilidad,
            imagenUrl: imagenUrl 
        });

        const savedProduct = await newProduct.save();
        res.json(savedProduct);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        // 1. Preparamos los datos nuevos
        const datosActualizados = {
            ...req.body, // Copiamos nombre, precio, etc.
        };

        // 2. Si el usuario subió una foto nueva, la agregamos al objeto
        if (req.file) {
            datosActualizados.imagenUrl = req.file.path;
        }

        // 3. Actualizamos en la BD
        const productUpdated = await Product.findByIdAndUpdate(
            req.params.id, 
            datosActualizados, // Usamos el objeto que armamos arriba
            { new: true } // Para que nos devuelva el producto ya modificado
        );

        if (!productUpdated) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json(productUpdated);
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar", error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Producto no encontrado" });
        return res.sendStatus(204); 
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};