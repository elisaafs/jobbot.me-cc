const express = require("express");
const router = express.Router();

const db = require("./db");

router.get("/posts", async (req, res) => {
  rows = await db.getAllPosts();
  res.json(rows);
});

router.post("/posts", async (req, res) => {
  const { title, text } = req.body;
  if (!title) {
    return res.status(400).end("The parameter title is missing");
  }
  if (!text) {
    return res.status(400).end("The parameter text is missing");
  }

  rows = await db.addNewPost(title, text);
  res.json({
    success: true,
    post: rows
  });
});

router.get("/posts/:postId/comments", async (req, res) => {
  rows = await db.getCommentsByPostId(req.params.postId);
  res.json(rows);
});

router.post("/posts/:postId/comments", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).end("The parameter text is missing");
  }

  rows = await db.addComment(req.params.postId, text);
  res.json({
    success: true,
    comment: rows
  });
});

router.delete("/posts/:postId/comments/:commentId", async (req, res) => {
  await db.deleteComment(req.params.postId, req.params.commentId);
  res.json({
    success: true
  });
});

module.exports = router;
