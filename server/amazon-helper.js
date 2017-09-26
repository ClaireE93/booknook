const keys = require('../config/amazon');
const Piranhax = require("piranhax");
const client = new Piranhax(keys.ACCESS_KEY, keys.SECRET_KEY, "booknook0e-20")

const parseData = (data) => {
  const final = [];
  data.Item.forEach((item) => {
    const obj = {
      title: item.ItemAttributes.Title,
      image: item.LargeImage.URL,
      url: item.DetailPageURL,
      ASIN: item.ASIN,
      desc: item.EditorialReviews ? item.EditorialReviews.EditorialReview.Content : 'No Description Available',
    };
    const author = typeof item.ItemAttributes.Author === 'object' ?
                  item.ItemAttributes.Author.join(', ') : item.ItemAttributes.Author;
    obj.author = author;
    final.push(obj);
  });

  return final
};

const findRecs = (data, callback) => {
  client.SimilarityLookup(data.ASIN, {ResponseGroup: ['Images', 'Small']})
  .then((results) => {
    callback(null, parseData(results.data()));
  })
  .catch((err) => {
    console.error('ERROR IN SIMILARITY LOOKUP!', err);
    callback(err, null);
  })
};

const findBook = (data, callback) => {
  client.ItemSearch('Books', {
    Keywords: `${data.query}`,
    ResponseGroup: ['Images', 'Small', 'EditorialReview'],
  })
  .then((results) => {
    callback(null, parseData(results.data()));
  })
  .catch((err) => {
    callback(err, null);
  });
};



module.exports.findRecs = findRecs;
module.exports.findBook = findBook;
