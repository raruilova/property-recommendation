# 🏡 Property Recommendation App

Este proyecto es una aplicación web para la gestión y visualización de propiedades, construida con **Next.js 15 (App Router)** y TypeScript. Permite a los usuarios explorar un listado de propiedades, buscar por ciudad y tipo, y gestionar sus propiedades favoritas, persistiendo la selección localmente.

## ✨ Características Principales

- **Listado de Propiedades**: Muestra una lista de propiedades con detalles clave como título, ciudad, tipo, precio, ambientes y metros cuadrados.
- **Búsqueda y Filtrado**: Funcionalidad de búsqueda por ciudad y tipo de propiedad.
- **Gestión de Favoritos**: Los usuarios pueden marcar/desmarcar propiedades como favoritas, y esta selección se guarda en el navegador utilizando `localStorage`.
- **Página de Favoritos**: Una sección dedicada para ver todas las propiedades que el usuario ha marcado como favoritas.
- **Páginas de Detalle de Propiedad**: Cada propiedad tiene su propia página de detalle con información más exhaustiva.
- **Desarrollado con Next.js 15**: Utiliza el App Router para una arquitectura moderna y eficiente.
- **TypeScript**: Código tipado para mayor robustez y mantenimiento.
- **Responsive Design**: Adaptable a diferentes tamaños de pantalla.

## 🚀 Tecnologías Utilizadas

- **Next.js 15**: Framework de React para aplicaciones web con SSR/SSG/ISR.
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **Tailwind CSS** (asumiendo su uso por las clases de utilidad comunes) para estilizado.
- **`localStorage`**: Para la persistencia de datos del lado del cliente (favoritos).

## 🛠️ Configuración y Ejecución Local

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

### Prerrequisitos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- [npm](https://www.npmjs.com/) (viene con Node.js) o [Yarn](https://yarnpkg.com/)

### Instalación

1.  **Clona el repositorio:**

    ```bash
    git clone <URL_DE_TU_REPOSITORIO>
    cd property-recommendation
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    # o
    yarn install
    ```

### Ejecución

Para iniciar la aplicación en modo desarrollo:

```bash
npm run dev
# o
yarn dev
```

property-recommendation/
├── .next/ # Carpeta generada por Next.js (caché, build)
├── node_modules/ # Dependencias del proyecto
├── public/ # Archivos estáticos (imágenes, favicon)
├── src/
│ ├── app/ # Rutas de la aplicación (App Router)
│ │ ├── (header)/ # Grupo de rutas para páginas principales
│ │ │ ├── favorites/ # Página de favoritos
│ │ │ │ └── page.tsx
│ │ │ ├── properties/ # Páginas de detalle de propiedades
│ │ │ │ └── [id]/
│ │ │ │ └── page.tsx
│ │ │ └── layout.tsx # Layout principal del grupo (aquí se envuelve el FavoritesProvider)
│ │ ├── page.tsx # Página principal (Home)
│ │ ├── favicon.ico
│ │ └── globals.css # Estilos globales
│ ├── components/ # Componentes de UI reutilizables
│ │ ├── Footer.tsx
│ │ ├── Header.tsx
│ │ └── PropertyCard.tsx # Tarjeta individual de propiedad
│ ├── hooks/ # Hooks personalizados (si los hay, ej. useFavorites ahora consume Contexto)
│ │ └── useFavorites.ts # Ahora este hook consume FavoritesContext
│ ├── models/ # Definiciones de modelos de datos (ej. Property.ts)
│ ├── services/ # Lógica para interactuar con APIs o datos (ej. propertyService)
│ │ ├── propertyService.ts
│ │ └── recommendationService.ts
├── .gitignore # Archivos y carpetas a ignorar por Git
├── next-env.d.ts # Declaraciones de entorno de Next.js
├── next.config.js # Configuración de Next.js
├── package.json # Dependencias y scripts del proyecto
├── package-lock.json # Bloqueo de versiones de dependencias (si usas npm)
├── postcss.config.js # Configuración de PostCSS (para Tailwind CSS, etc.)
├── README.md # Este archivo
└── tsconfig.json # Configuración de TypeScript
