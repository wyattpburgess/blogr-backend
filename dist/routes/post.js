"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const post_1 = require("../controllers/post");
const router = (0, express_1.Router)();
// GET /post/posts
router.get("/posts", post_1.getPosts);
// POST /post/add-new
router.post("/add-new", [
    (0, express_validator_1.body)("title").trim().isLength({ min: 5 }),
    (0, express_validator_1.body)("body").trim().isLength({ min: 5 }),
], post_1.createPost);
// GET post/post-ids
router.get("/post-ids", post_1.getPostIds);
// GET /post/:postId
router.get("/:postId", post_1.getPost);
exports.default = router;
