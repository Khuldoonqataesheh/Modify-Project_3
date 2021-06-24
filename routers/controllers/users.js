const db = require("./../../db/db");
const bcrypt = require("bcrypt");
const createNewAuthor = async (req, res) => {
  const { firstName, lastName, age, country, email, password, role_id } =
    req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users ( firstName, lastName, age, country, email, password, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const data = [
    firstName,
    lastName,
    age,
    country,
    email,
    hashedPassword,
    role_id,
  ];
  let id;
  db.query(query, data, (err, result) => {
    if (err) throw err;
    id = result.insertId;
    const query_2 = `SELECT * FROM users WHERE id=?;`;
    const data2 = [id];
    db.query(query_2, data2, (err, result) => {
      if (err) throw err;
      res.status(201).json(result);
    });
  });
};

module.exports = {
  createNewAuthor,
};
