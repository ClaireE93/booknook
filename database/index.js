const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose connected');
});

let bookSchema = mongoose.Schema({
  title: {type: String, unique: true},
  author: String,
  ASIN: {type: String, unique: true},
  image: String,
  url: String,
  desc: String,
});

const Book = mongoose.model('Book', bookSchema);

const save = (bookObj, callback) => {
  const newBook = new Book(bookObj);
  newBook.save((err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const fetch = (callback) => {
  Book.find((err, data) => {
    callback(err, data);
  });
};

const deleteEntry = (ASIN, callback) => {
  Book.remove({ ASIN }, function (err) {
    if (err) {
        callback(err, null);
    } else {
      callback(null);
    }
  });
};

module.exports.save = save;
module.exports.fetch = fetch;
module.exports.deleteEntry = deleteEntry;
