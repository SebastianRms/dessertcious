import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
        required: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    sabores: {
        type: String, 
        default: "" 
    },
    tamanos: {
        type: String,
        default: ""
    },
    disponibilidad: {
        type: String,
        enum: ['Mostrador', 'Por pedido', 'Temporada'],
        default: 'Por pedido'
    },
    imagenUrl: {
        type: String,
        required: true 
    },
    publicId: {
        type: String 
    }
}, {
    timestamps: true
});

export default mongoose.model('Product', productSchema);