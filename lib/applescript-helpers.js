const osa = require('node-osascript');
const _ = require('lodash');

async function buddySearch(query) {
  return new Promise((resolve, reject) => {
    osa.executeFile(
      'applescripts/buddy-search.scpt',
      { searchQuery: query },
      (err, results, raw) => {
        if (err) return resolve(null)
        if (!results.length) return resolve(null);

        results = _.chain(results)
          .uniqBy(item => `${item.name} ${item.handle}`)
          .sortBy(r => r.handle)

        resolve(results);
      });
  })
}

async function sendMessage(handle, message) {
  osa.executeFile('applescripts/send-message.scpt',
    { theHandle: handle, textMessage: message },
    (err, results, raw) => {
      if (err) console.log(err);
    });
}

module.exports = { buddySearch, sendMessage }
