#!/usr/bin/osascript -l JavaScript

const app = Application('Messages')
const service = app.services()[0]
console.log(service.name());
console.log();

const list = service.buddies.whose({ name: { _equals: 'Anthony Balmeo' } })
console.log(list[0]);
