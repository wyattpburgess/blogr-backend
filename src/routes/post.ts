import { Router } from "express";
import { body } from "express-validator";

import { getPosts, createPost, getPostIds, getPost } from "../controllers/post";

const router = Router();

// GET /post/posts
router.get("/posts", getPosts);

// POST /post/add-new
router.post(
  "/add-new",
  [
    body("title").trim().isLength({ min: 5 }),
    body("body").trim().isLength({ min: 5 }),
  ],
  createPost
);

// GET post/post-ids
router.get("/post-ids", getPostIds);

// GET /post/:postId
router.get("/:postId", getPost);

export default router;
