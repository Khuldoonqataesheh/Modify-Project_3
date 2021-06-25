const db = require("../../db/db");

const createNewComment = (req, res) => {
	const article_id = req.params.id;

	const { comment, commenter} = req.body;

	const query = `INSERT INTO comments (comment,article_id,commenter_id) VALUES (?,?,?)`;
	const data = [comment,article_id, commenter];
	db.query(query, data, (err, result) => {
	  if (err) {
		res.send(err);
		return;
	  }
	  const query_2 = `SELECT * FROM comments WHERE id=?;`;
	  const data = [result.insertId];
	  db.query(query_2, data, (err, response) => {
		if (err) {
		  res.send(err);
		  return;
		}
		res.status(201).json(response);
	  });
});
}


module.exports = {
	createNewComment,
};
