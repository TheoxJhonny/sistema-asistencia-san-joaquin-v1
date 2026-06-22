const { query } = require('./base.repository');
async function esperadosHoy() {
  return query(`SELECT i.id_invitacion, v.nombre_completo, v.tipo_documento, v.numero_documento, v.telefono,
    e.descripcion, e.fecha_hora_inicio, u.nombre unidad, ing.id_ingreso, ing.hora_ingreso,
    CONCAT(COALESCE(ve.marca,''),' ',COALESCE(ve.modelo,''),' ',COALESCE(ve.color,''),' ',COALESCE(ve.patente,'')) vehiculo
    FROM invitaciones i JOIN visitantes v ON v.id_visitante=i.id_visitante
    JOIN eventos e ON e.id_evento=i.id_evento JOIN unidades u ON u.id_unidad=e.id_unidad
    LEFT JOIN ingresos ing ON ing.id_invitacion=i.id_invitacion
    LEFT JOIN vehiculos ve ON ve.id_vehiculo=i.id_vehiculo
    WHERE DATE(e.fecha_hora_inicio)=CURDATE()
    ORDER BY e.fecha_hora_inicio, v.nombre_completo`);
}
async function registrar(id_invitacion, user) {
  return query(`INSERT IGNORE INTO ingresos(id_invitacion,id_guardia,hora_ingreso) VALUES(:id_invitacion,:id_guardia,NOW())`, { id_invitacion, id_guardia: user.id });
}
module.exports = { esperadosHoy, registrar };
