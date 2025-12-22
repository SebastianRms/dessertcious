# 🍰 Dessertcious - Catálogo de Repostería Artesanal

Bienvenido a **Dessertcious**, una plataforma diseñada para gestionar y exhibir el catálogo de postres de un negocio real. Este proyecto nació con el objetivo de profesionalizar la presencia digital de la marca, priorizando el trato humano y la facilidad de uso.

---

## 🚀 Bitácora de Desarrollo (Diario del Proyecto)

Esta sección documenta mi camino de aprendizaje y las decisiones técnicas tomadas para estandarizar mis procesos de desarrollo.

### 📅 [Fecha de inicio: 21-12-2025] - Cimientos y Arquitectura
- **Decisión:** Implementé una **Arquitectura Clásica** (Controllers, Models, Routes) para asegurar la escalabilidad y el orden del código.
- **Aprendizaje:** Instalé y configuré **pnpm**. Aprendí que es más eficiente que npm gracias a los *hard links* y más seguro debido a su estructura de dependencias no plana.
- **Reto superado:** Resolví el warning de construcción de `bcrypt` usando `pnpm approve-builds`, comprendiendo que ciertas librerías necesitan permisos para compilar binarios nativos.
- **Seguridad:** Configuré un archivo `.gitignore` robusto para proteger las variables de entorno (`.env`) y optimizar el peso del repositorio.

---

## 🛠️ Stack Tecnológico

### Backend (API)
- **Node.js & Express:** Servidor base.
- **MongoDB Atlas:** Base de Datos NoSQL en la nube.
- **Mongoose:** ODM para el modelado de datos.
- **Zod:** Validación estricta de esquemas (asegurando la integridad de los postres).
- **JWT & Bcrypt:** Seguridad y encriptación para el acceso administrativo.
- **Cloudinary:** Almacenamiento persistente de imágenes de alta calidad.

### Frontend (App) - *En proceso*
- **Angular:** Framework principal.
- **Tailwind CSS:** Diseño responsivo y moderno.
- **RxJS:** Manejo de flujos reactivos (debounceTime para filtros).

