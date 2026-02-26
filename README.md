# ComparaYA

Comparador de precios entre supermercados con normalización de datos mediante IA.

## Instalación y Configuración

1. **Clonar el repo:**
   
```bash
git clone https://github.com/agomezmoreno/TFG.git
```

### Instalar dependencias:
Debes hacerlo tanto en la carpeta de la web como en la del servidor:

```bash
cd frontend && npm install
cd ../backend && npm install
```

### Variables de Entorno y Configuración:
1. **Backend:** Crea un archivo `.env` en la carpeta `backend` (este archivo está protegido por el `.gitignore`). Añade tus credenciales de base de datos:
   * `DB_HOST`
   * `DB_USER`
   * `DB_PASSWORD`
   * `DB_NAME`
   * `PORT`

2. **Frontend:** La configuración de **Firebase** al igual que el archivo  `.env` el archivo  `firebase.js` está protegido por  `.gitignore` se encuentra en la ruta `frontend/src/utils/auth/`. Asegúrate de configurar allí tus claves de proyecto para que el login funcione correctamente.

### Lanzar el proyecto:

* **Backend:** Ejecuta `node app.js` desde la carpeta `backend`.
* **Frontend:** Ejecuta `npm run dev` desde la carpeta `frontend`.

### Tecnologías Clave:

* **Stack:** React, Node.js y MySQL.
* **IA:** Automatización con n8n y procesamiento mediante OpenAI.
* **Bot:** Telegram para la gestión de alertas de precio y consultas en tiempo real.

## Enlace a producción 
https://tfg.agomezmoreno.dev
