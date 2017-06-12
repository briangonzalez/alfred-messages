// https://gist.github.com/tresni/3289532
const imessage = require('osa-imessage')

imessage.handleForName('Stef Koenig')
  .then(handle => {
    // imessage.send(handle, 'Hello')
    console.log(handle);
  })
  .catch((e) => {
    console.log(e);
  })
