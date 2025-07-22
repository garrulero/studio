# Webhooks y Plantillas JSON

Aquí tienes la lista de los webhooks utilizados en la aplicación y sus plantillas JSON correspondientes, en un formato fácil de copiar.

---

### 1. Contacto General

- **URL**: 
  ```
  https://n8n.goilab.com/webhook/contacto-goilab
  ```
- **Origen**: Formularios de las páginas "Agendar Cita", "Casos" y "Servicios".
- **Plantilla JSON**:
  ```json
  {
    "name": "Nombre del cliente",
    "email": "email@cliente.com",
    "message": "Mensaje del cliente."
  }
  ```

---

### 2. Registro de Errores

- **URL**: 
  ```
  https://n8n.goilab.com/webhook/recibir-error
  ```
- **Origen**: Sistema automático de captura de errores.
- **Plantilla JSON**:
  ```json
  {
    "message": "Descripción del error.",
    "stack": "Traza de la pila del error.",
    "componentStack": "Traza del componente de React (si aplica).",
    "trigger": "Acción que causó el error (ej: 'Submit en formulario').",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "url": "https://goilab.com/pagina-del-error",
    "userAgent": "Información del navegador del usuario.",
    "environment": "production"
  }
  ```
