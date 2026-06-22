-- Sistema de Registro y Control de Asistencia a Reuniones y Actividades
-- Modelo normalizado hasta 3FN: catálogos separados, dependencias completas y sin atributos transitivos.
DROP DATABASE IF EXISTS asistencia_san_joaquin_v2;
CREATE DATABASE asistencia_san_joaquin_v2 CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE asistencia_san_joaquin_v2;

CREATE TABLE roles (
  id_rol INT AUTO_INCREMENT PRIMARY KEY,
  nombre ENUM('Administrador','Funcionario','Guardia') NOT NULL UNIQUE,
  descripcion VARCHAR(180)
);

CREATE TABLE unidades (
  id_unidad INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  descripcion VARCHAR(250),
  activa BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  id_rol INT NOT NULL,
  id_unidad INT NULL,
  nombre VARCHAR(120) NOT NULL,
  correo VARCHAR(140) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_rol) REFERENCES roles(id_rol),
  FOREIGN KEY (id_unidad) REFERENCES unidades(id_unidad)
);

CREATE TABLE eventos (
  id_evento INT AUTO_INCREMENT PRIMARY KEY,
  id_unidad INT NOT NULL,
  id_creador INT NOT NULL,
  descripcion VARCHAR(220) NOT NULL,
  fecha_hora_inicio DATETIME NOT NULL,
  fecha_hora_fin DATETIME NULL,
  lugar VARCHAR(140) NOT NULL,
  cupo INT NULL,
  estado ENUM('Programado','Finalizado','Cancelado') NOT NULL DEFAULT 'Programado',
  creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_unidad) REFERENCES unidades(id_unidad),
  FOREIGN KEY (id_creador) REFERENCES usuarios(id_usuario),
  INDEX idx_eventos_fecha_unidad (fecha_hora_inicio, id_unidad)
);

CREATE TABLE evento_anfitriones (
  id_evento INT NOT NULL,
  id_usuario INT NOT NULL,
  es_principal BOOLEAN NOT NULL DEFAULT FALSE,
  agregado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_evento, id_usuario),
  FOREIGN KEY (id_evento) REFERENCES eventos(id_evento),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE visitantes (
  id_visitante INT AUTO_INCREMENT PRIMARY KEY,
  tipo_documento ENUM('RUT','Pasaporte') NOT NULL,
  numero_documento VARCHAR(25) NOT NULL,
  nombre_completo VARCHAR(150) NOT NULL,
  telefono VARCHAR(25),
  creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_visitante_documento (tipo_documento, numero_documento)
);

CREATE TABLE vehiculos (
  id_vehiculo INT AUTO_INCREMENT PRIMARY KEY,
  id_visitante INT NOT NULL,
  marca VARCHAR(60) NOT NULL,
  modelo VARCHAR(60) NOT NULL,
  color VARCHAR(40) NOT NULL,
  patente VARCHAR(12) NOT NULL UNIQUE,
  FOREIGN KEY (id_visitante) REFERENCES visitantes(id_visitante)
);

CREATE TABLE invitaciones (
  id_invitacion INT AUTO_INCREMENT PRIMARY KEY,
  id_evento INT NOT NULL,
  id_visitante INT NOT NULL,
  id_usuario_registro INT NOT NULL,
  id_vehiculo INT NULL,
  fecha_visita DATE NOT NULL,
  hora_visita TIME NOT NULL,
  observacion VARCHAR(250),
  creada_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_evento) REFERENCES eventos(id_evento),
  FOREIGN KEY (id_visitante) REFERENCES visitantes(id_visitante),
  FOREIGN KEY (id_usuario_registro) REFERENCES usuarios(id_usuario),
  FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id_vehiculo),
  UNIQUE KEY uk_evento_visitante (id_evento, id_visitante)
);

CREATE TABLE ingresos (
  id_ingreso INT AUTO_INCREMENT PRIMARY KEY,
  id_invitacion INT NOT NULL UNIQUE,
  id_guardia INT NOT NULL,
  hora_ingreso DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  observacion VARCHAR(250),
  FOREIGN KEY (id_invitacion) REFERENCES invitaciones(id_invitacion),
  FOREIGN KEY (id_guardia) REFERENCES usuarios(id_usuario)
);

INSERT INTO roles(nombre, descripcion) VALUES
('Administrador','Gestiona usuarios, unidades y reportes generales'),
('Funcionario','Crea eventos de su unidad e invita visitantes'),
('Guardia','Registra ingreso efectivo de visitantes del día');

INSERT INTO unidades(nombre, descripcion) VALUES
('Informática','Unidad de soporte tecnológico'),('Comunicaciones','Unidad de comunicaciones'),('Admisión','Unidad de admisión');

-- Contraseñas demo. En producción se deben reemplazar por hashes bcrypt.
INSERT INTO usuarios(id_rol,id_unidad,nombre,correo,password_hash) VALUES
(1,1,'Administrador General','admin@sanjoaquin.cl','admin123'),
(2,1,'María Soto','maria.soto@sanjoaquin.cl','usuario123'),
(3,1,'Guardia Portería','guardia@sanjoaquin.cl','guardia123');


-- Admin: admin123
UPDATE usuarios
SET password_hash = '$2a$10$rOy/7AH6rukGb9M3Q3WEXusIA4363DV7cHa5OzZzw3beJH/fOeYFq'
WHERE correo = 'admin@sanjoaquin.cl';

-- Funcionario: usuario123
UPDATE usuarios
SET password_hash = '$2a$10$FOdKSiJPUmPSYpJgOEzRpOfB0N9W1WE5nSA/zPgykab9i/MtpT.we'
WHERE correo = 'maria.soto@sanjoaquin.cl';

-- Guardia: guardia123
UPDATE usuarios
SET password_hash = '$2a$10$XBSp0fScyJdBOIh0S8xHs.cCboWh9Jtj0LyKnPNrGHIfSI7QC5I6.'
WHERE correo = 'guardia@sanjoaquin.cl';

-- Consultas de reporte solicitadas
-- Admin: visitas por fecha y unidad
SELECT DATE(e.fecha_hora_inicio) fecha, u.nombre unidad, v.nombre_completo, IF(ing.id_ingreso IS NULL,'No asistió','Asistió') estado
FROM invitaciones i JOIN eventos e ON e.id_evento=i.id_evento JOIN unidades u ON u.id_unidad=e.id_unidad
JOIN visitantes v ON v.id_visitante=i.id_visitante LEFT JOIN ingresos ing ON ing.id_invitacion=i.id_invitacion
WHERE DATE(e.fecha_hora_inicio) BETWEEN '2026-06-01' AND '2026-06-30';

-- Usuario: asistieron y no asistieron de su unidad
SELECT e.descripcion, SUM(ing.id_ingreso IS NOT NULL) asistieron, SUM(ing.id_ingreso IS NULL) no_asistieron
FROM invitaciones i JOIN eventos e ON e.id_evento=i.id_evento LEFT JOIN ingresos ing ON ing.id_invitacion=i.id_invitacion
WHERE e.id_unidad = 1 GROUP BY e.id_evento;


SELECT id_usuario, nombre, correo, password_hash, id_rol
FROM usuarios;