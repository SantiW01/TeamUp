const pool = require("../database");

module.exports = {
  async CheckIfExist(table, id) {
    const query = await pool.query(`SELECT * from ${table} where id = ?`, [id]);
    console.log(query);
  },
};
