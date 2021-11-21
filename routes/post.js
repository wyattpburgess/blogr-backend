const express = require('express');
const { body } = require('express-validator');

const postController = require('../controllers/post');

const router = express.Router();

// POST /post/add-new
router.post(
  '/add-new',
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('body')
      .trim()
      .isLength({ min: 5 })
  ],
  postController.createPost
);

module.exports = router;
