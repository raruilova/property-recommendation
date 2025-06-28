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
- **Tailwind CSS**  Estilos.
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
    git clone https://github.com/raruilova/property-recommendation
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
