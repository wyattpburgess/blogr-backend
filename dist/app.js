"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const post_1 = __importDefault(require("./routes/post"));
const DB_CONNECTION_STRING = process.env.MONGODB_CONNECTION
    ? process.env.MONGODB_CONNECTION
    : "";
const app = (0, express_1.default)();
// parse application/json
app.use(body_parser_1.default.json({ type: "application/json" }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
// post routes
app.use("/post", post_1.default);
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data: data,
    });
});
mongoose_1.default
    .connect(DB_CONNECTION_STRING)
    .then(() => {
    app.listen(process.env.PORT);
    console.log(`Running on Port ${process.env.PORT}`);
})
    .catch((err) => console.log(err));
