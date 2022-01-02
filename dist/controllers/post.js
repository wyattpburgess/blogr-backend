"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPost = exports.getPostIds = exports.getPosts = exports.createPost = void 0;
const express_validator_1 = require("express-validator");
const post_1 = __importDefault(require("../models/post"));
const createPost = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const body = req.body.body;
    const post = new post_1.default({
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
        .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.createPost = createPost;
const getPosts = (req, res, next) => {
    // GET all posts in ascending order
    post_1.default.find()
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
exports.getPosts = getPosts;
const getPostIds = (req, res, next) => {
    post_1.default.find({}, "_id")
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
exports.getPostIds = getPostIds;
const getPost = (req, res, next) => {
    const postId = req.params.postId;
    post_1.default.findById(postId)
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
exports.getPost = getPost;
