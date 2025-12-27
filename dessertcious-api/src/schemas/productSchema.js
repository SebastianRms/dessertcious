import { z } from "zod";

export const createCategorySchema = z.object({
    nombre: z.string({
        required_error: "El nombre de la categoría es requerido"
    }).min(3, "El nombre debe tener al menos 3 caracteres")
});

export const createProductSchema = z.object({
  body: z.object({
    nombre: z
      .string({
        required_error: "El nombre del producto es requerido",
      })
      .min(3),

    descripcion: z.string().optional(),

    categoria: z.string({
      required_error: "La categoría es requerida",
    }),

    sabores: z.string().optional(),

    tamanos: z.string().optional(),

    disponibilidad: z.enum(["Mostrador", "Por pedido", "Temporada"], {
      errorMap: () => ({
        message:
          "La disponibilidad debe ser: Mostrador, Por pedido o Temporada",
      }),
    }),
  }),
});
