const express = require('express');

const postController = require('../controllers/post');

const router = express.Router();

// POST /post/add-new
router.post(
  '/add-new',
  postController.createPost
);

module.exports = router;
