const express = require("express");
const { body } = require("express-validator");

const postController = require("../controllers/post");

const router = express.Router();

// GET /post/posts
router.get("/posts", postController.getPosts);

// POST /post/add-new
router.post(
  "/add-new",
  [
    body("title").trim().isLength({ min: 5 }),
    body("body").trim().isLength({ min: 5 }),
  ],
  postController.createPost
);

// GET post/post-ids
router.get("/post-ids", postController.getPostIds);

// GET /post/:postId
router.get("/:postId", postController.getPost);

module.exports = router;
