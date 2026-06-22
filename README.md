# Sistema de Registro y Control de Asistencia - Sede San Joaquín

Proyecto web profesional en capas usando Node.js, Express, JavaScript, Bootstrap 5, EJS y MySQL.

## Requisitos cubiertos
- Tres perfiles: Administrador, Funcionario y Guardia.
- Administrador crea unidades y usuarios.
- Funcionario crea eventos vinculados a su unidad, invita visitantes y suma anfitriones.
- Guardia ve solo visitantes esperados del día y registra el ingreso efectivo.
- Reportes por fecha y unidad para administrador.
- Reporte de asistentes y no asistentes para funcionario.
- Registro flexible de visitantes por RUT validado o pasaporte.
- Registro opcional de vehículo: marca, modelo, color y patente.
- Base de datos normalizada hasta tercera forma normal.

## Arquitectura por capas
- `routes`: define URLs del sistema.
- `controllers`: recibe solicitudes HTTP y coordina respuestas.
- `services`: reglas de negocio, como inicio de sesión.
- `repositories`: consultas SQL y acceso a datos.
- `middleware`: protección de rutas por sesión y rol.
- `views`: interfaz EJS con Bootstrap.
- `public`: CSS, JS e imágenes.
- `sql/schema_3fn.sql`: creación de BDD, datos demo y consultas de reportes.

## Instalación
1. Crear la base de datos ejecutando `sql/schema_3fn.sql` en MySQL Workbench.
2. Copiar `.env.example` como `.env` y ajustar usuario/contraseña de MySQL.
3. Instalar dependencias:
```bash
npm install
```
4. Ejecutar:
```bash
npm run dev
```
5. Abrir `http://localhost:3000`.

## Usuarios demo
- Administrador: `admin@sanjoaquin.cl` / `admin123`
- Funcionario: `maria.soto@sanjoaquin.cl` / `usuario123`
- Guardia: `guardia@sanjoaquin.cl` / `guardia123`

## Nota de seguridad
Para una entrega académica se dejaron contraseñas demo en el script SQL. El código soporta bcrypt; para producción, reemplazar esos valores por hashes bcrypt y usar HTTPS.
