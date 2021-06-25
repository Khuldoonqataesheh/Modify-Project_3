const db = require("./../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = (req, res) => {
  const { email, password } = req.body;
  const SECRET = process.env.SECRET;
  const query_2 = `SELECT * FROM users INNER JOIN roles ON users.role_id = roles.role_id  WHERE email=?`;
  const data2 = [email];

  db.query(query_2, data2, async (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!result.length) {
      res.status(404).json("email does not exists");
      return;
    }

    const ver = await bcrypt.compare(password, result[0].password);
    if (!ver) {
      res.status(403).json("wrong password");
      return;
    }
    const payload = {
      user_id: result[0].user_id,
      role: result[0].role,
    };
    const options = { expiresIn: "60h" };
    const token = jwt.sign(payload, SECRET, options);
    res.status(200).json({ token });
    return;
  });
};

module.exports = {
  login,
};
