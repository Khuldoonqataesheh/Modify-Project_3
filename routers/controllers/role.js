const db = require("./../../db/db");

const createNewRole = (req, res) => {
	const { role } = req.body;
	const query = `INSERT INTO roles (role) VALUES (?)`;
	const data = [role];
	db.query(query, data, (err, result) => {
		if (err) throw err;
		console.log("RESULT: ", result);
		res.json(result);
	  });
};

module.exports = {
	createNewRole,
};
