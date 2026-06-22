const bcrypt = require('bcryptjs');
const repo = require('../repositories/auth.repository');
async function login(correo, password) {
  const user = await repo.findByEmail(correo);
  if (!user) return null;
  let ok = user.password_hash === password;
  if (!ok && user.password_hash.startsWith('$2')) ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return null;
  return { id: user.id_usuario, nombre: user.nombre, correo: user.correo, rol: user.rol, id_unidad: user.id_unidad, unidad: user.unidad };
}
module.exports = { login };
