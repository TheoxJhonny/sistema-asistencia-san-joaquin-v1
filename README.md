# Sistema de Registro y Control de Asistencia - Sede San Joaquín

Proyecto web desarrollado utilizando **Node.js, Express, JavaScript, Bootstrap 5, EJS y MySQL**, siguiendo una arquitectura por capas y una base de datos normalizada hasta Tercera Forma Normal (3FN).

## Demo en Producción

La aplicación se encuentra desplegada y disponible públicamente en:

🔗 **https://sistema-asistencia-san-joaquin-v1.onrender.com**

Esto permite acceder y probar el sistema sin necesidad de instalar dependencias ni configurar una base de datos local.

---

## Tecnologías Utilizadas

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap 5
* EJS

### Backend

* Node.js
* Express.js

### Base de Datos

* MySQL

### Seguridad

* bcrypt
* express-session
* Helmet

### Despliegue

* Render (Aplicación Web)
* Railway (Base de Datos MySQL)

---

## Funcionalidades Principales

### Administrador

* Gestión de usuarios.
* Gestión de unidades.
* Acceso a reportes globales.
* Administración general del sistema.

### Funcionario

* Creación de eventos.
* Registro de visitantes.
* Asignación de anfitriones.
* Consulta de asistentes y ausentes.

### Guardia

* Visualización de visitantes esperados.
* Registro de ingresos efectivos.
* Control de acceso diario.

---

## Requisitos Cubiertos

* Tres perfiles de usuario:

  * Administrador
  * Funcionario
  * Guardia

* Gestión de eventos institucionales.

* Registro de visitantes nacionales y extranjeros.

* Registro opcional de vehículos.

* Control de ingreso efectivo.

* Reportes por unidad y rango de fechas.

* Base de datos normalizada hasta 3FN.

* Arquitectura por capas.

---

## Arquitectura del Proyecto

```text
src/
├── config
├── controllers
├── middleware
├── repositories
├── routes
├── services
└── app.js

views/
public/
sql/
```

### Descripción de Capas

**Routes**

* Define las rutas HTTP del sistema.

**Controllers**

* Procesan solicitudes y generan respuestas.

**Services**

* Implementan la lógica de negocio.

**Repositories**

* Gestionan el acceso a datos y consultas SQL.

**Middleware**

* Controlan autenticación y autorización.

**Views**

* Interfaces EJS renderizadas por Express.

**Public**

* Recursos estáticos (CSS, JS e imágenes).

---

## Base de Datos

El archivo:

```text
sql/schema_3fn.sql
```

incluye:

* Creación de tablas.
* Relaciones.
* Datos de prueba.
* Consultas de reportería.

Entidades principales:

* Roles
* Usuarios
* Unidades
* Eventos
* Visitantes
* Vehículos
* Invitaciones
* Ingresos

---

## Instalación Local

### 1. Clonar repositorio

```bash
git clone https://github.com/TheoxJhonny/sistema-asistencia-san-joaquin-v1.git
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=asistencia_san_joaquin_v2
SESSION_SECRET=dev-secret
```

### 4. Ejecutar base de datos

Ejecutar:

```text
sql/schema_3fn.sql
```

en MySQL Workbench.

### 5. Iniciar aplicación

```bash
npm start
```

o

```bash
npm run dev
```

---

## Usuarios de Demostración

### Administrador

Correo:

```text
admin@sanjoaquin.cl
```

Contraseña:

```text
admin123
```

### Funcionario

Correo:

```text
maria.soto@sanjoaquin.cl
```

Contraseña:

```text
usuario123
```

### Guardia

Correo:

```text
guardia@sanjoaquin.cl
```

Contraseña:

```text
guardia123
```

---

## Despliegue

### Aplicación Web

* Render

### Base de Datos

* Railway

---

## Estado del Proyecto

Versión académica completamente funcional y desplegada en producción.

---

## Autor

Desarrollado para la asignatura de Desarrollo Web y Bases de Datos.

Sistema de Registro y Control de Asistencia a Reuniones y Actividades – Sede San Joaquín.
