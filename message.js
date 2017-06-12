const imessage = require('osa-imessage')
const alfy = require('alfy');

const args = JSON.parse(process.argv[2])
imessage.send(args.handle, args.message)
console.log(`"${args.message}" sent to ${args.handle}`)
