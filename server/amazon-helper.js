const keys = require('../config/amazon');
const Piranhax = require("piranhax");
const client = new Piranhax(keys.ACCESS_KEY, keys.SECRET_KEY, "booknook0e-20")

const find = (data, callback) => {
  client.ItemSearch('Books', {
    Keywords: `${data.title} ${data.author}`
  })
  .then((results) => {
    console.log('searched!', results);
    const firstBookASIN = results.get("Item[0].ASIN", 0);
    console.log('firstBookASIN', firstBookASIN);
    return client.SimilarityLookup(firstBookASIN);
  })
  .then((results) => {
    const data = results.data();
    console.log('RESULTS ARE', data);
    const attr = data.Item[0].ItemAttributes;
    const recArr = [];
    data.Item.forEach((item) => {
      const obj = {
        title: item.ItemAttributes.Title,
        author: item.ItemAttributes.Author
      };
      recArr.push(obj);
    });
    console.log('RecArr Is', recArr);

    callback(null, {title: 'hi'})
  })
  .catch((err) => {
    console.log('ERROR IN SIMILARITY LOOKUP!', err);
    callback(err, null);
  })

};

module.exports.find = find;

//
// client.ItemSearch("Books", {
//     Keywords: "Universe"
// }).then(results => {
//     // get ASIN item in items
//     let firstBookASIN = results.get("Item[0].ASIN", 0)
//
//     // get similarity
//     return client.SimilarityLookup(firstBookASIN)
// }).then(result => {
//     // check existence of ASIN
//     let ASIN = result.get("Item[0].ASIN", 0)
//
//     console.log(ASIN, result.data())
// }).catch(err => {
//     console.log(err)
// })
