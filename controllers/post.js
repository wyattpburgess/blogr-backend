const { validationResult } = require('express-validator');

const Post = require('../models/post');

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const body = req.body.body;
  const post = new Post({
    title: title,
    body: body
  });
  post
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Post created successfully!',
        post: post,
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};