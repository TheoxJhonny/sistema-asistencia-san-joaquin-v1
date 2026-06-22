const { query } = require('./base.repository');
async function findByEmail(correo) {
  const rows = await query(`SELECT u.id_usuario, u.nombre, u.correo, u.password_hash, r.nombre AS rol, un.id_unidad, un.nombre AS unidad
    FROM usuarios u JOIN roles r ON r.id_rol=u.id_rol
    LEFT JOIN unidades un ON un.id_unidad=u.id_unidad
    WHERE u.correo=:correo AND u.activo=1`, { correo });
  return rows[0];
}
module.exports = { findByEmail };
