const alfy = require('alfy');
const helpers = require('./lib/applescript-helpers.js');

const input = (alfy.input || 'brian this is a message').split(' ');
const query = input[0];
const message = input.slice(1, input.length).join(' ').trim();

(async () => {
  let output = await helpers.buddySearch(query);
  if (!output) {
    return alfy.output([{
      title: `No results found for ${query}`,
      subtitle: 'Please try another query'
    }]);
  }

  alfy.output(output.map(buddy => {
    let displayMessage = message
    if (message.length > 60) {
      const first = message.slice(0, 20)
      const last = message.slice(message.length - 20, message.length)
      displayMessage = `${first}.............${last}`
    }

    return {
      title: buddy.name,
      subtitle: message ? `Send "${displayMessage}" to ${buddy.handle}` : `Type to send message to ${buddy.handle}`,
      arg: JSON.stringify({
        handle: buddy.handle,
        name: buddy.name,
        message
      })
    }
  }));
})()
