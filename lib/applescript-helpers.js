const osa = require('node-osascript');
const _ = require('lodash');

const Store = require('jfs');
const cacheVersion = require('../package.json').version;
const db = new Store('data', { pretty: true });

async function cleanupResults(results) {
  results = _.chain(results)
    .uniqBy(item => `${item.name} ${item.handle}`)
    .sortBy(r => r.handle)

  resultsWithFreq = []
  for (let result of results) {
    result.frequency = await getFrequencyForHandle(result.handle)
    resultsWithFreq.push(result)
  }

  resultsWithFreq.sort((r1, r2) => r2.frequency - r1.frequency)
  return resultsWithFreq
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
  const cacheID = `${cacheVersion}:${query}`;

  return new Promise(async (resolve, reject) => {
    const data = await getCachedData(cacheID);
    if (data) { resolve(await cleanupResults(data)) }

    osa.executeFile(
      'applescripts/buddy-search.scpt',
      { searchQuery: query },
      async (err, results, raw) => {
        if (err) return resolve(null)
        if (!results.length) return resolve(null);

        results = await cleanupResults(results)
        resolve(results);
        db.save(cacheID, results);
      });
  })
}

async function sendMessage(handle, message) {
  const cacheID = `${cacheVersion}:${handle}:frequency`;

  const frequency = await getFrequencyForHandle(handle);
  db.save(cacheID, frequency + 1)

  osa.executeFile('applescripts/send-message.scpt',
    { theHandle: handle, textMessage: message },
    (err, results, raw) => {
      if (err) console.log(err);
    });
}

function getFrequencyForHandle(handle) {
  const cacheID = `${cacheVersion}:${handle}:frequency`;

  return new Promise((resolve, reject) => {
    db.get(cacheID, (err, data) => {
      if (err) resolve(0);
      resolve(data + 1)
    })
  })
}

module.exports = { buddySearch, sendMessage }
