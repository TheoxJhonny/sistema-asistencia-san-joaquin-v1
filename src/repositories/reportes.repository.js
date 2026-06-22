const { query } = require('./base.repository');
async function visitas({ fecha_inicio, fecha_fin, id_unidad }, user) {
  const params = { fecha_inicio, fecha_fin, id_unidad: id_unidad || user.id_unidad };
  const unitFilter = user.rol === 'Administrador' ? (id_unidad ? 'AND e.id_unidad=:id_unidad' : '') : 'AND e.id_unidad=:id_unidad';
  return query(`SELECT DATE(e.fecha_hora_inicio) fecha, u.nombre unidad, e.descripcion, v.nombre_completo,
    v.numero_documento, CASE WHEN ing.id_ingreso IS NULL THEN 'No asistió' ELSE 'Asistió' END estado,
    ing.hora_ingreso
    FROM invitaciones i JOIN eventos e ON e.id_evento=i.id_evento
    JOIN unidades u ON u.id_unidad=e.id_unidad JOIN visitantes v ON v.id_visitante=i.id_visitante
    LEFT JOIN ingresos ing ON ing.id_invitacion=i.id_invitacion
    WHERE DATE(e.fecha_hora_inicio) BETWEEN :fecha_inicio AND :fecha_fin ${unitFilter}
    ORDER BY fecha DESC, unidad, v.nombre_completo`, params);
}
async function unidades() { return query('SELECT * FROM unidades ORDER BY nombre'); }
module.exports = { visitas, unidades };
