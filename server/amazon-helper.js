const keys = require('../config/amazon');
const Piranhax = require("piranhax");
const client = new Piranhax(keys.ACCESS_KEY, keys.SECRET_KEY, "booknook0e-20")

const findRecs = (data, callback) => {
  client.SimilarityLookup(data.ASIN, {ResponseGroup: ['Images', 'Small']})
  .then((results) => {
    const data = results.data();
    const recArr = [];
    data.Item.forEach((item) => {
      const obj = {
        title: item.ItemAttributes.Title,
        image: item.LargeImage.URL,
        url: item.DetailPageURL,
      };
      const author = typeof item.ItemAttributes.Author === 'object' ?
                    item.ItemAttributes.Author.join(', ') : item.ItemAttributes.Author;
      obj.author = author;
      recArr.push(obj);
    });

    callback(null, recArr);
  })
  .catch((err) => {
    console.error('ERROR IN SIMILARITY LOOKUP!', err);
    callback(err, null);
  })
};

const findBook = (data, callback) => {
  console.log(`Searching for: ${data.title} ${data.author}`)
  client.ItemSearch('Books', {
    Keywords: `${data.title} ${data.author}`,
    ResponseGroup: ['Images', 'Small'],
  })
  .then((results) => {
    const data = results.data();
    const final = [];
    data.Item.forEach((item) => {
      const obj = {
        title: item.ItemAttributes.Title,
        image: item.LargeImage.URL,
        url: item.DetailPageURL,
        ASIN: item.ASIN,
      };
      const author = typeof item.ItemAttributes.Author === 'object' ?
                    item.ItemAttributes.Author.join(', ') : item.ItemAttributes.Author;
      obj.author = author;
      final.push(obj);
    });

    callback(null, final);
  })
  .catch((err) => {
    callback(err, null);
  });
};

module.exports.findRecs = findRecs;
module.exports.findBook = findBook;
