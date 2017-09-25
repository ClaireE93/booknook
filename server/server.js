const express = require('express');
const app = express();
const morgan = require('morgan');
const db = require('../database/index');
// const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(express.static(__dirname + './../www'));
// app.use(bodyParser.json());

app.get('/books', (req, res, next) => {
  const callback = (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end(err.toString());
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify(data));
    }
  };

  console.log('req body is', req.body);
  db.save(req.body, callback);

});

const port = 3000;

const server = app.listen(port, function() {
  console.log(`App listening at ${port}`);
});
