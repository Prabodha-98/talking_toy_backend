const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require("./routers/user.router");
const cors = require('cors');

const app = express();

// Enable CORS and specify allowed origins (replace '*' with your specific origins)
app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

app.use(bodyParser.json());

app.use('/', userRouter);

module.exports = app;
