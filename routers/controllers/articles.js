const db = require("./../../db/db");

const getAllArticles = (req, res) => {
  const query = `SELECT * FROM articles WHERE  is_deleted=0;`;

  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    console.log("RESULT: ", result);
    res.json(result);
  });
};

const getArticlesByAuthor = (req, res) => {
  const author = req.query.author;

  if (!author) return res.status(404).json("not found");

  const query = `SELECT * FROM articles WHERE  author_id=?;`;
  const data = [author];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    console.log("RESULT: ", result);
    res.json(result);
  });
};

const getAnArticleById = (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(404).json("not found");
  const query = `SELECT * FROM articles WHERE  is_deleted=0 AND id =? ;`;
const data =[id]
  db.query(query,data, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    console.log("RESULT: ", result);
    res.json(result);
  });

  // if (!_id) return res.status(404).json("not found");

  // articlesModel
  //   .findOne({ _id })
  //   .populate("author", "firstName -_id")
  //   .exec()
  //   .then((result) => {
  //     res.status(200).json(result);
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //   });
};

const createNewArticle = (req, res) => {
  const { title, description, author_id } = req.body;

  const query = `INSERT INTO articles ( title, description, author_id ) VALUES (?, ?, ?)`;
  const data = [title, description, author_id];
  let id;
  db.query(query, data, (err, result) => {
    if (err) throw err;
    id = result.insertId;
    const query_2 = `SELECT * FROM articles WHERE id=?;`;
    const data2 = [id];
    db.query(query_2, data2, (err, result) => {
      if (err) throw err;
      res.status(201).json(result);
    });
  });
};

const updateAnArticleById = (req, res) => {
  const id = req.params.id;
  const { title, description, author_id } = req.body;
  const query = `UPDATE articles 
  SET title = ?, description =  ? , author_id = ?  
   WHERE id = ?`;
  const arr = [title, description, author_id, id];
  db.query(query, arr, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }

    const query_2 = `SELECT * FROM articles WHERE id=?`;
    const data = [id];
    db.query(query_2, data, (err, response) => {
      if (err) {
        res.send(err);
        return;
      }
      res.status(201).json(response);
    });
  });
};

const deleteArticleById = (req, res) => {
  const id = req.params.id;
  const query = "UPDATE articles SET is_deleted = 1 WHERE id=?";
  const data = [id];
  db.query(query, data, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.status(200).json("deleted successfully");
  });
};

const deleteArticlesByAuthor = (req, res) => {
  const author = req.body.author;

  const query = "UPDATE articles SET is_deleted = 1 WHERE id=?";
  const data = [author];
  db.query(query, data, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.status(200).json("deleted successfully");
  });
};

module.exports = {
  getAllArticles,
  getArticlesByAuthor,
  getAnArticleById,
  createNewArticle,
  updateAnArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
};
