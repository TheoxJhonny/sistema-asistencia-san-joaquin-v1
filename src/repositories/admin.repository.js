const bcrypt = require('bcryptjs');
const { query } = require('./base.repository');
async function datos() {
  const unidades = await query('SELECT * FROM unidades ORDER BY nombre');
  const usuarios = await query(`SELECT u.*, r.nombre rol, un.nombre unidad FROM usuarios u JOIN roles r ON r.id_rol=u.id_rol LEFT JOIN unidades un ON un.id_unidad=u.id_unidad ORDER BY u.nombre`);
  const roles = await query('SELECT * FROM roles ORDER BY nombre');
  return { unidades, usuarios, roles };
}
async function crearUnidad(data) { return query('INSERT INTO unidades(nombre,descripcion) VALUES(:nombre,:descripcion)', data); }
async function crearUsuario(data) {
  const password_hash = await bcrypt.hash(data.password || '123456', 10);
  return query(`INSERT INTO usuarios(id_rol,id_unidad,nombre,correo,password_hash,activo) VALUES(:id_rol,:id_unidad,:nombre,:correo,:password_hash,1)`, { ...data, password_hash });
}
module.exports = { datos, crearUnidad, crearUsuario };
