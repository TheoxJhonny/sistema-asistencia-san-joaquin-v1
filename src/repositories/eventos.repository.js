const { query, transaction } = require('./base.repository');
async function listar(user) {
  const extra = user.rol === 'Funcionario' ? 'WHERE e.id_unidad=:id_unidad' : '';
  return query(`SELECT e.*, u.nombre unidad, creador.nombre creador
    FROM eventos e JOIN unidades u ON u.id_unidad=e.id_unidad
    JOIN usuarios creador ON creador.id_usuario=e.id_creador
    ${extra} ORDER BY e.fecha_hora_inicio DESC`, { id_unidad: user.id_unidad });
}
async function opciones(user) {
  const unidades = await query('SELECT * FROM unidades ORDER BY nombre');
  const usuarios = await query('SELECT id_usuario,nombre,id_unidad FROM usuarios WHERE activo=1 ORDER BY nombre');
  return { unidades, usuarios };
}
async function crear(data, user) {
  return transaction(async conn => {
    const idUnidad = user.rol === 'Administrador' ? data.id_unidad : user.id_unidad;
    const [r] = await conn.execute(`INSERT INTO eventos(id_unidad,id_creador,descripcion,fecha_hora_inicio,fecha_hora_fin,lugar,cupo,estado)
      VALUES(?,?,?,?,?,?,?,'Programado')`, [idUnidad, user.id, data.descripcion, data.fecha_hora_inicio, data.fecha_hora_fin || null, data.lugar, data.cupo || null]);
    await conn.execute(`INSERT INTO evento_anfitriones(id_evento,id_usuario,es_principal) VALUES(?,?,1)`, [r.insertId, user.id]);
    return r.insertId;
  });
}
async function agregarAnfitrion(id_evento, id_usuario) {
  return query(`INSERT IGNORE INTO evento_anfitriones(id_evento,id_usuario,es_principal) VALUES(:id_evento,:id_usuario,0)`, { id_evento, id_usuario });
}
async function invitar(data, user) {
  return transaction(async conn => {
    let idVisitante;
    const [existentes] = await conn.execute('SELECT id_visitante FROM visitantes WHERE tipo_documento=? AND numero_documento=?', [data.tipo_documento, data.numero_documento]);
    if (existentes.length) idVisitante = existentes[0].id_visitante;
    else {
      const [r] = await conn.execute(`INSERT INTO visitantes(tipo_documento,numero_documento,nombre_completo,telefono) VALUES(?,?,?,?)`, [data.tipo_documento, data.numero_documento, data.nombre_completo, data.telefono || null]);
      idVisitante = r.insertId;
    }
    const [invitacion] = await conn.execute(`INSERT INTO invitaciones(id_evento,id_visitante,id_usuario_registro,fecha_visita,hora_visita,observacion) VALUES(?,?,?,?,?,?)`, [data.id_evento, idVisitante, user.id, data.fecha_visita, data.hora_visita, data.observacion || null]);
    if (data.viene_auto === 'on' && data.patente) {
      let idVehiculo;
      const [v] = await conn.execute('SELECT id_vehiculo FROM vehiculos WHERE patente=?', [data.patente]);
      if (v.length) idVehiculo = v[0].id_vehiculo;
      else {
        const [rv] = await conn.execute(`INSERT INTO vehiculos(id_visitante,marca,modelo,color,patente) VALUES(?,?,?,?,?)`, [idVisitante, data.marca, data.modelo, data.color, data.patente]);
        idVehiculo = rv.insertId;
      }
      await conn.execute('UPDATE invitaciones SET id_vehiculo=? WHERE id_invitacion=?', [idVehiculo, invitacion.insertId]);
    }
  });
}
module.exports = { listar, opciones, crear, agregarAnfitrion, invitar };
