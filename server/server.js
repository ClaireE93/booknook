const express = require('express');
const app = express();
const morgan = require('morgan');
const db = require('../database/index');
const bodyParser = require('body-parser');
const helpers = require('./amazon-helper');

app.use(morgan('dev'));
app.use(express.static(__dirname + './../www'));
app.use(bodyParser.json());

const endResponse = (err, data, res) => {
  if (err) {
   res.statusCode = 404;
   res.end(err.toString());
 } else {
   res.statusCode = 200;
   res.end(JSON.stringify(data));
 }
};

app.post('/books', (req, res, next) => {
  const callback = (err, data) => {
    endResponse(err, data, res);
  };

  db.save(req.body, callback);
});

app.get('/books', (req, res, next) => {
  const callback = (err, data) => {
    endResponse(err, data, res);
  };

  db.fetch(callback);
});

app.delete('/books', (req, res, next) => {
  const callback = (err, data) => {
    endResponse(err, data, res);
  };

  db.deleteEntry(req.body.ASIN, callback);
});

app.post('/bookSearch', (req, res, next) => {
  const callback = (err, data) => {
    endResponse(err, data, res);
  };

  helpers.findBook(req.body, callback);
});

app.get('/recommendations', (req, res, next) => {
  const callback = (err, data) => {
    endResponse(err, data, res);
  };
  helpers.findRecs(req.query, callback);
});

const port = 3000;

const server = app.listen(port, function() {
  console.log(`App listening at ${port}`);
});
