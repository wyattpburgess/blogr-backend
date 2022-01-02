import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import Post from "../models/post";
import { ResponseError } from "../interfaces";

export const createPost = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: ResponseError = new Error(
      "Validation failed, entered data is incorrect."
    );
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const body = req.body.body;
  const post = new Post({
    title: title,
    body: body,
  });
  post
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post created successfully!",
        post: post,
      });
    })
    .catch((err: ResponseError) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const getPosts = (req: Request, res: Response, next: NextFunction) => {
  // GET all posts in ascending order
  Post.find()
    .sort({ updatedAt: -1 })
    .then((posts) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        posts: posts,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const getPostIds = (req: Request, res: Response, next: NextFunction) => {
  Post.find({}, "_id")
    .then((ids) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        ids: ids,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const getPost = (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      res.status(200).json({
        message: "Post fetched successfully",
        post: post,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
