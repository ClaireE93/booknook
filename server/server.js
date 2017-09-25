const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static(__dirname + './../www'));

const port = 3000;

const server = app.listen(port, function() {
  console.log(`App listening at ${port}`);
});
