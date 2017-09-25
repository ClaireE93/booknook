const keys = require('../config/amazon');
const Piranhax = require("piranhax");
const client = new Piranhax(keys.ACCESS_KEY, keys.SECRET_KEY, "booknook0e-20")

const find = (data, callback) => {
  client.ItemSearch('Books', {
    Keywords: `${data.title} ${data.author}`,
  })
  .then((results) => {
    const firstBookASIN = results.get("Item[0].ASIN", 0);
    return client.SimilarityLookup(firstBookASIN, {ResponseGroup: ['Images', 'Small']});
  })
  .then((results) => {
    const data = results.data();
    const attr = data.Item[0].LargeImage;
    const attr2 = data.Item[0].ItemAttributes;
    const recArr = [];
    data.Item.forEach((item) => {
      const obj = {
        title: item.ItemAttributes.Title,
        image: item.LargeImage.URL,
      };
      const author = typeof item.ItemAttributes.Author === 'object' ?
                    item.ItemAttributes.Author.join(', ') : item.ItemAttributes.Author;
      obj.author = author;
      recArr.push(obj);
    });

    callback(null, recArr);
  })
  .catch((err) => {
    console.log('ERROR IN SIMILARITY LOOKUP!', err);
    callback(err, null);
  })

};

module.exports.find = find;
