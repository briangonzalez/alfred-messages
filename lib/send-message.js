const { hideMessagesApp } = require('./applescript-helpers')
const imessage = require('osa-imessage')
const alfy = require('alfy')

const args = JSON.parse(process.argv[2])

try {
  imessage.send(args.handle, args.message).then(hideMessagesApp)
} catch (e) {
  alfy.log('Error sending message, retrying once.', e)
  imessage.send(args.handle, args.message).then(hideMessagesApp)
}

console.log(`To ${args.name}: ${args.message}`)
