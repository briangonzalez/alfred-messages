const helpers = require('./applescript-helpers.js');

const args = JSON.parse(process.argv[2]);
helpers.sendMessage(args.handle, args.message);
console.log(`To ${args.name}: ${args.message}`);
