import Category from '../models/category.js'; 

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createCategory = async (req, res) => {
    // NOTA: Ya no validamos aquí con Zod, el middleware ya lo hizo.
    try {
        const { nombre } = req.body;

        const categoryFound = await Category.findOne({ nombre });
        if (categoryFound) return res.status(400).json({ message: "Esa categoría ya existe" });

        const newCategory = new Category({ nombre });
        await newCategory.save();
        res.json(newCategory);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json({ message: "Categoría no encontrada" });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};