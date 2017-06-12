var osascript = require('node-osascript');

osascript.executeFile('applescripts/buddy-search.scpt',
  { searchQuery: 'stef' },
  (err, result, raw) => {
    if (err) return console.error(err)
    console.log(result)
  });
