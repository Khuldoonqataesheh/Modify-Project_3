const db = require("./../../db/db");

const createNewRole = (req, res) => {
  const { role } = req.body;
  const query = `INSERT INTO roles (role) VALUES (?)`;
  const data = [role];
  let id;
  db.query(query, data, (err, result) => {
    if (err) throw err;
    id = result.insertId;
    const query_2 = `SELECT * FROM roles WHERE role_id=?;`;
    const data2 = [id];
    db.query(query_2, data2, (err, result) => {
      if (err) throw err;
      res.status(201).json(result);
    });
  });
};

module.exports = {
  createNewRole,
};
