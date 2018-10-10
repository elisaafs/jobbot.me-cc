const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: "jobbot-cc",
  password: process.env.DB_PASSWORD,
  port: 5432
});

exports.getAllPosts = async function() {
  const { rows } = await pool.query(
    "SELECT * FROM posts ORDER BY created_at DESC;"
  );
  return rows;
};

exports.addNewPost = async function(title, text) {
  const { rows } = await pool.query(
    "INSERT INTO posts (title, text) VALUES ($1, $2) RETURNING *;",
    [title, text]
  );
  return rows[0];
};

exports.getPostById = async function(postId) {
  const { rows } = await pool.query(
    "SELECT id, title, text FROM posts WHERE id = $1 ORDER BY created_at DESC;",
    [postId]
  );
  return rows;
};

exports.getCommentsByPostId = async function(postId) {
  const { rows } = await pool.query(
    "SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC;",
    [postId]
  );
  return rows;
};

exports.addComment = async function(postId, text) {
  const { rows } = await pool.query(
    "INSERT INTO comments (post_id, text) VALUES ($1, $2) RETURNING *;",
    [postId, text]
  );
  return rows[0];
};

exports.deleteComment = async function(postId, commentId) {
  await pool.query("DELETE FROM comments WHERE post_id = $1 AND id = $2;", [
    postId,
    commentId
  ]);
};
