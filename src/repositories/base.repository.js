const pool = require('../config/db');
async function query(sql, params = {}) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}
async function transaction(work) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const result = await work(conn);
    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
module.exports = { query, transaction };
