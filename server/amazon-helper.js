const keys = require('../config/amazon');
const Piranhax = require("piranhax");
const client = new Piranhax(keys.ACCESS_KEY, keys.SECRET_KEY, "booknook0e-20")

const find = (data, callback) => {
  client.ItemSearch('Books', {
    Keywords: `${data.title} ${data.author}`,
  })
  .then((results) => {
    console.log('searched!', results);
    const firstBookASIN = results.get("Item[0].ASIN", 0);
    return client.SimilarityLookup(firstBookASIN, {ResponseGroup: ['Images', 'Small']});
  })
  .then((results) => {
    const data = results.data();
    console.log('RESULTS ARE', data);
    console.log('RESULTS ARE', data.Request.SimilarityLookupRequest.ResponseGroup);
    const attr = data.Item[0].LargeImage;
    const attr2 = data.Item[0].ItemAttributes;
    console.log('ATTR ARE', attr);
    console.log('ATTR ARE', attr2);
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
    console.log('RecArr Is', recArr);

    callback(null, recArr);
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
