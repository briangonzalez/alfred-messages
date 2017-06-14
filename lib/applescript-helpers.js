const osa = require('node-osascript');
const _ = require('lodash');

const Store = require('jfs');
const cacheVersion = require('../package.json').version;
const db = new Store('data', { pretty: true });

function cleanupResults(results) {
  return _.chain(results)
    .uniqBy(item => `${item.name} ${item.handle}`)
    .sortBy(r => r.handle)
}

async function getCachedData(key) {
  return new Promise(async (resolve, reject) => {
    const data = db.get(key, (err, data) => {
      if (err) return resolve(null);
      resolve(data);
    });
  });
}

async function buddySearch(query) {
  const cacheKey = `${cacheVersion}:${query}`;

  return new Promise(async (resolve, reject) => {

    const data = await getCachedData(cacheKey);
    if (data) resolve(cleanupResults(data));

    osa.executeFile(
      'applescripts/buddy-search.scpt',
      { searchQuery: query },
      (err, results, raw) => {
        if (err) return resolve(null)
        if (!results.length) return resolve(null);

        results = cleanupResults(results)
        resolve(results);
        db.save(cacheKey, results);
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
