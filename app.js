const express = require('express');
const bodyParser = require('body-parser');

const postRoutes = require('./routes/post');

const app = express();

// parse application/json
app.use(bodyParser.json({ type: 'application/json' }))

// post routes
app.use('/post', postRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ 
    message: message,
    data: data
  });
});

app.listen(8080);
