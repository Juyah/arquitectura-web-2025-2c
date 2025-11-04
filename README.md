# API Backend E-commerce (TP Arquitectura Web)

Este proyecto es un backend en **Node.js** y **Express** que simula la API de un catálogo de e-commerce. Desarrollado como Trabajo Práctico (TP) para la materia de Arquitectura Web.

La aplicación gestiona productos, y para cada producto, gestiona sus ofertas asociadas (de distintas tiendas), las preguntas de los usuarios y las reseñas.

---

## Decisión de Arquitectura (Diseño de API)

El diseño de la API se inspiró en el funcionamiento de plataformas como **MercadoLibre**, con un enfoque en la optimización de la performance y la reducción del uso de red.

La estrategia principal fue separar la información esencial de los datos secundarios:

1.  **Endpoint de Catálogo (`/products`):** Este endpoint devuelve la información necesaria para la "primera pantalla" o vista de catálogo (nombre, precio principal, imagen, etc.).
2.  **Endpoints Anidados (`/:id/...`):** Los datos más pesados o que no son críticos para la vista de lista (como todas las reseñas, todas las preguntas, o las ofertas de otras tiendas) se cargan on-demand a través de endpoints anidados.

Este enfoque evita sobrecargar la respuesta inicial del catálogo con datos que el usuario quizás nunca necesite, mejorando la velocidad de carga inicial. El cliente solo solicita los detalles (reviews, questions, offers) cuando el usuario entra a la vista de detalle del producto.

---

## Flujo de Datos (En Memoria)

Esta aplicación no utiliza una base de datos persistente.

En su lugar, al iniciar el servidor, los diferentes repositorios leen los datos desde archivos `.json` locales que actúan como dummy data.

Toda esta información se carga y se mantiene en memoria durante el ciclo de vida de la aplicación. Las operaciones (POST, PUT, DELETE) modifican los datos en memoria. Si el servidor se reinicia, los datos vuelven a su estado original cargado desde los archivos JSON.

---

## Cómo Ejecutar

1.  Clonar el repositorio.
2.  Instalar las dependencias:
    ```bash
    npm install
    ```
3.  Iniciar el servidor:
    ```bash
    npm start
    ```
    O en modo desarrollo con hot-reloading:
    ```bash
    npm run dev
    ```
4.  El servidor estará corriendo en `http://localhost:3000`.

---

## API Endpoints

El router principal está montado bajo el prefijo `/products`.

### Health Check

* `GET /health`: Endpoint simple para verificar que la aplicación está en funcionamiento. Responde con `{ "status": "UP" }`.

### Productos

Rutas base: `/products`

* `GET /`: Lista todos los productos (información esencial de catálogo).
* `GET /:id`: Obtiene un producto específico por su ID.
* `POST /`: Crea un nuevo producto.
* `PUT /:id`: Actualiza un producto existente.
* `DELETE /:id`: Elimina un producto.

### Ofertas

Rutas base: `/products/:id/offers`

* `GET /:id/offers`: Lista todas las ofertas para un producto específico.
* `GET /:id/offers/:offerId`: Obtiene una oferta específica.
* `POST /:id/offers`: Crea una nueva oferta para un producto.
* `PUT /:id/offers/:offerId`: Actualiza una oferta.
* `DELETE /:id/offers/:offerId`: Elimina una oferta.

### Preguntas

Rutas base: `/products/:id/questions`

* `GET /:id/questions`: Lista todas las preguntas para un producto.
* `GET /:id/questions/:questionId`: Obtiene una pregunta específica.
* `POST /:id/questions`: Crea una nueva pregunta para un producto.
* `PUT /:id/questions/:questionId`: Actualiza una pregunta (ej. para añadir la respuesta).
* `DELETE /:id/questions/:questionId`: Elimina una pregunta.

### Reseñas (Reviews)

Rutas base: `/products/:id/reviews`

* `GET /:id/reviews`: Lista todas las reseñas para un producto.
* `GET /:id/reviews/:reviewId`: Obtiene una reseña específica.
* `POST /:id/reviews`: Crea una nueva reseña para un producto.
* `PUT /:id/reviews/:reviewId`: Actualiza una reseña.
* `DELETE /:id/reviews/:reviewId`: Elimina una reseña.

### Middleware

* `router.param("id", ...)`: Al ser una API anidada, todas las rutas que operan sobre un producto específico utilizan el parámetro `:id`. Se utiliza un middleware de `express.Router` que intercepta todas las rutas que contienen el parámetro `:id`. Este middleware (`productExistsParam`) verifica que el producto exista en el repositorio antes de continuar con el controlador. Si el producto no se encuentra, devuelve automáticamente un error 404.