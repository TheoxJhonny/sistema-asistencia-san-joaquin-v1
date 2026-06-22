const repo = require('../repositories/reportes.repository');
async function index(req, res) {
  const hoy = new Date().toISOString().slice(0,10);
  const filtros = { fecha_inicio: req.query.fecha_inicio || hoy, fecha_fin: req.query.fecha_fin || hoy, id_unidad: req.query.id_unidad || '' };
  const rows = await repo.visitas(filtros, req.session.user);
  res.render('pages/reportes', { title: 'Reportes', rows, filtros, unidades: await repo.unidades() });
}
module.exports = { index };
