import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import postRoutes from "./routes/post";
import { ResponseError } from "./interfaces";

const DB_CONNECTION_STRING: string = process.env.MONGODB_CONNECTION
  ? process.env.MONGODB_CONNECTION
  : "";
const app = express();

// parse application/json
app.use(bodyParser.json({ type: "application/json" }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// post routes
app.use("/post", postRoutes);

app.use(
  (error: ResponseError, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
      message: message,
      data: data,
    });
  }
);

mongoose
  .connect(DB_CONNECTION_STRING)
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
