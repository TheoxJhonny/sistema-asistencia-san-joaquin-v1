const repo = require('../repositories/dashboard.repository');
async function index(req, res) {
  const kpis = await repo.kpis(req.session.user);
  const agenda = await repo.agendaHoy(req.session.user);
  res.render('pages/dashboard', { title: 'Dashboard', kpis, agenda });
}
module.exports = { index };
