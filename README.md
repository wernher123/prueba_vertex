# Prueba Vertex - Catálogo de Productos

web para gestión de productos

## Requisitos

- Node.js v16 o superior
- SQL Server 2019 o superior
- npm

### 1. Clonar el repositorio

git clone https://github.com/wernher123/prueba_vertex.git
cd prueba-vertex

# Para el back
cd back
npm install
Crear .env 

#para el front
cd front
npm install
Crear .env 

## Autenticación
Registro: Accede a /register y crea una nueva cuenta
Login: Accede a /login con tus credenciales
Token JWT: Se guarda en localStorage automáticamente
Rutas protegidas: Solo usuarios logeados pueden acceder al catálogo

## Estrategia de Optimización de Imágenes
Dónde se comprime
Backend (src/controllers/image.controller.js):

Se usa la librería Sharp para procesar imágenes antes de subirlas a Cloudinary
El middleware multer recibe el archivo en el servidor

### Endpoints API
## Autenticación
POST /register - Crear nueva cuenta
POST /login - Iniciar sesión

## Items (Protegidos)
GET /items - Listar todos los items
GET /items/:id_item - Obtener un item
POST /items - Crear item
PUT /items/:id_item - Actualizar item
DELETE /items/:id_item - Eliminar item

##Imágenes (Protegido)
POST /upload - Subir imagen

## Base de Datos
ejecutar el script.sql
