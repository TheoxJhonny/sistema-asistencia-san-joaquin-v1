# Normalización hasta 3FN

## 1FN
Los datos son atómicos. Por ejemplo, los anfitriones no se guardan en una columna de texto, sino en `evento_anfitriones`.

## 2FN
Las tablas puente usan claves compuestas completas. En `evento_anfitriones`, `es_principal` depende del par `id_evento + id_usuario`.

## 3FN
No hay dependencias transitivas. La unidad del usuario está en `usuarios`, la unidad del evento está en `eventos`, y los datos del visitante están solo en `visitantes`.

## Tablas principales
- `roles`: perfiles del sistema.
- `unidades`: áreas administrativas.
- `usuarios`: funcionarios, administradores y guardias.
- `eventos`: actividades creadas por funcionarios.
- `evento_anfitriones`: anfitriones adicionales.
- `visitantes`: personas invitadas.
- `vehiculos`: vehículos de visitantes.
- `invitaciones`: relación visitante-evento.
- `ingresos`: marca única de ingreso efectivo.
