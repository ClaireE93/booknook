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
  // isbn: {type: STRING, unique: true}
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
  })
};

module.exports.save = save;


SECRET_KEY='vOo6jRd/tZg8OEvpqWX/t/ySYcxIJe4+/Gk2kGVX'
ACCESS_KEY='AKIAJKKZNNS4TWFYK4MQ'
