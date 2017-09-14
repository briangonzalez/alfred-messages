const { sendMessage, hideMessagesApp } = require('./applescript-helpers')
const alfy = require('alfy')

const args = JSON.parse(process.argv[2])

try {
  sendMessage(args.handle, args.message).then(hideMessagesApp)
} catch (e) {
  sendMessage(args.handle, args.message).then(hideMessagesApp)
  alfy.log('Error sending message, retrying once.', e)
}

console.log(`To ${args.name}: ${args.message}`)
