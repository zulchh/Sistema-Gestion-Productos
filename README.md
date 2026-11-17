# Sistema de Gestión de Productos

## Descripción

Este proyecto consiste en una aplicación web desarrollada con Node.js, Express y MongoDB, que permite registrar usuarios e iniciar sesión para administrar productos mediante operaciones CRUD (crear, consultar, actualizar y eliminar).

La aplicación utiliza JWT para la autenticación de usuarios y MongoDB Atlas para almacenar la información.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JavaScript
- HTML y CSS
- JSON Web Token (JWT)
- bcryptjs
- Jest
- Supertest
- GitHub Actions
- Render

## Requisitos previos

Antes de ejecutar el proyecto es necesario contar con:

- Node.js instalado.
- npm.
- Una cuenta de MongoDB Atlas.
- Una base de datos y un usuario configurados en MongoDB Atlas.

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/zulchh/Sistema-Gestion-Productos.git
```

2. Entrar a la carpeta del proyecto:

```bash
cd Sistema-Gestion-Productos
```

3. Instalar las dependencias:

```bash
npm install
```

## Configuración de variables de entorno

Crear un archivo llamado `.env` en la carpeta principal del proyecto.

Agregar las siguientes variables:

```env
PORT=3000
MONGO_URI=tu_uri_de_mongodb
JWT_SECRET=tu_clave_secreta
```

Reemplazar los valores de ejemplo por los datos correspondientes a la configuración personal de MongoDB Atlas y una clave secreta segura.

No publicar el archivo `.env` en GitHub.

## Ejecución del proyecto

Para iniciar el servidor:

```bash
npm start
```

Para ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

Después, abrir en el navegador:

```text
http://localhost:3000
```

## Pruebas automatizadas

Para ejecutar las pruebas:

```bash
npm test
```

El proyecto utiliza Jest, Supertest y MongoDB Memory Server para comprobar diferentes funcionalidades de la aplicación.

## Funcionalidades

- Registro de usuarios.
- Inicio de sesión.
- Autenticación mediante JWT.
- Creación de productos.
- Consulta de productos.
- Actualización de productos.
- Eliminación de productos.
- Protección de rutas mediante autenticación.

## Integración continua

El proyecto utiliza GitHub Actions para ejecutar automáticamente las pruebas cuando se realizan cambios en la rama principal (`main`) o se genera una solicitud de integración.

El archivo de configuración se encuentra en:

```text
.github/workflows/tests.yml
```

## Despliegue

La aplicación se encuentra desplegada mediante Render y utiliza MongoDB Atlas como servicio de base de datos.

**Repositorio:** https://github.com/zulchh/Sistema-Gestion-Productos

**Aplicación publicada:** [Agregar aquí la URL pública de Render]
