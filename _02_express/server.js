'use strict';
const express = require('express');

let app = express();
app.get('/', function (req, res) {
  res.send('Hello world!');
});

console.log("Server has been started");
app.listen(3000);