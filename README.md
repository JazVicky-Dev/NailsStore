# NailMuse

NailMuse es una aplicación web para la gestión de turnos de un estudio de uñas.  
Permite que las clientas puedan explorar inspiración, solicitar un turno y que la administradora gestione esas solicitudes desde un panel privado.

## Funcionalidades principales

### Cliente
- Visualización de servicios
- Galería de inspiración
- Solicitud de turno paso a paso
- Selección de fecha y horarios disponibles
- Carga de referencia visual
- Envío de solicitud real al backend

### Admin
- Login privado con JWT
- Visualización de solicitudes
- Filtro de solicitudes pendientes o todas
- Aceptar o rechazar solicitudes
- Agenda visual por fecha
- Bloqueo y desbloqueo manual de horarios

---

## Tecnologías utilizadas

### Frontend
- React
- React Router
- CSS personalizado

### Backend
- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- JWT
- PostgreSQL
- Maven

### Base de datos
- PostgreSQL corriendo con Docker

---

## Requisitos previos

Antes de ejecutar el proyecto, es necesario tener instalado:

- Node.js
- npm
- Java 17
- IntelliJ IDEA
- Docker Desktop
- Git

---

## Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPO
cd NailsReact
```

2. Levantar la base de datos

Entrar a la carpeta del backend: cd nailmuse-backend
Levantar PostgreSQL con Docker:docker compose up -d

3. Ejecutar el backend
   -./mvnw spring-boot:run
   El backend corre en:http://localhost:8080
   Swagger disponible en:http://localhost:8080/swagger-ui.html
   
5. Ejecutar el frontend
   Entrar a la carpeta del frontend:cd ../nailmuse-frontend
   Instalar dependencias:npm install
   Levantar el servidor de desarrollo: npm run dev
   El frontend corre en: http://localhost:5173

---

## Credenciales de administrador
	•	Usuario: admin
	•	Contraseña: admin123
	•	Login admin: http://localhost:5173/admin-login

---
## Autoras
	•	Jazmín Brunelli
	•	Victoria Ledezma

---

## Autoras

<img width="1512" height="764" alt="Captura de pantalla 2026-04-08 a la(s) 20 40 26" src="https://github.com/user-attachments/assets/960f6df3-47b4-4405-a6ea-fc0ffd4bbad1" />

---

<img width="1512" height="764" alt="Captura de pantalla 2026-04-08 a la(s) 20 40 50" src="https://github.com/user-attachments/assets/ca11c33c-93dc-4bb6-8236-63a3e4403489" />

---

<img width="1512" height="764" alt="Captura de pantalla 2026-04-08 a la(s) 20 41 00" src="https://github.com/user-attachments/assets/a9c7a2a8-0494-4706-ac27-7a6c22f93491" />

---

<img width="1512" height="764" alt="Captura de pantalla 2026-04-08 a la(s) 20 41 31" src="https://github.com/user-attachments/assets/37211056-8d42-4edb-ac65-c13c22d01969" />

