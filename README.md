# alfred-messages

> Message your Apple Contacts via Alfred using Messages

## Install

```
$ yarn global add alfred-messages         # hipster
$ npm install --global alfred-messages    # old school
```

or...

Grab the [latest release](https://github.com/briangonzalez/alfred-messages/releases) from Github.

## Usage

In Alfred, type `m`, your query, then your message.

eg.

```
m osc hey oscar, wassssup?
```

### Variables

| Options            | Type     | Description                                 |
| :----------------- | -------- | ------------------------------------------- |
| `af_exclude_email` | `string` | If email types should be excluded from list |

## Demo

![demo of alfred messages](https://user-images.githubusercontent.com/659829/27117260-a7bcc706-508a-11e7-80f9-d3db4360d19c.gif)

## Development

- `yarn link-to-alfred`: Symlinks current dir into Alfred
- `yarn unlink-from-alfred`: Removes symlink from Alfred

## Inspiration

- [Contacts CLI](https://github.com/keith/contacts-cli)

## License

MIT © [Brian Gonzalez](https://www.briangonzalez.org)
