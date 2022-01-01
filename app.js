const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const postRoutes = require("./routes/post");

const app = express();

// parse application/json
app.use(bodyParser.json({ type: "application/json" }));

app.use((req, res, next) => {
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

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
