const { query } = require('./base.repository');
function scope(user) { return user.rol === 'Funcionario' ? ' AND e.id_unidad = :id_unidad ' : ''; }
async function kpis(user) {
  const s = scope(user);
  const params = { id_unidad: user.id_unidad };
  const rows = await query(`SELECT
    COUNT(i.id_invitacion) AS programadas,
    SUM(CASE WHEN ing.id_ingreso IS NOT NULL THEN 1 ELSE 0 END) AS asistieron,
    SUM(CASE WHEN ing.id_ingreso IS NULL THEN 1 ELSE 0 END) AS pendientes
    FROM invitaciones i JOIN eventos e ON e.id_evento=i.id_evento
    LEFT JOIN ingresos ing ON ing.id_invitacion=i.id_invitacion
    WHERE DATE(e.fecha_hora_inicio)=CURDATE() ${s}`, params);
  return rows[0] || { programadas: 0, asistieron: 0, pendientes: 0 };
}
async function agendaHoy(user) {
  const s = scope(user);
  return query(`SELECT e.id_evento, e.descripcion, e.fecha_hora_inicio, un.nombre unidad,
    COUNT(i.id_invitacion) invitados,
    SUM(CASE WHEN ing.id_ingreso IS NOT NULL THEN 1 ELSE 0 END) ingresos
    FROM eventos e JOIN unidades un ON un.id_unidad=e.id_unidad
    LEFT JOIN invitaciones i ON i.id_evento=e.id_evento
    LEFT JOIN ingresos ing ON ing.id_invitacion=i.id_invitacion
    WHERE DATE(e.fecha_hora_inicio)=CURDATE() ${s}
    GROUP BY e.id_evento ORDER BY e.fecha_hora_inicio`, { id_unidad: user.id_unidad });
}
module.exports = { kpis, agendaHoy };
