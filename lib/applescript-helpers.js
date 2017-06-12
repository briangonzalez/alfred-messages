const osa = require('node-osascript');

async function buddySearch(query) {
  return new Promise((resolve, reject) => {
    osa.executeFile(
      'applescripts/buddy-search.scpt',
      { searchQuery: query },
      (err, results, raw) => {
        if (err) return resolve(null)
        if (!results.length) return resolve(null);
        resolve(results);
      });
  })
}

module.exports = { buddySearch }
