# urlite
A small very fast, dependency free url parser for nodejs and the web

- Written in 12 lines of code
- Unit tested
- About 15x faster than node's native url parser
- Runs both in node and the browser

## usage:
```js
npm install --save urlite

var url = require('urlite')

url.parse('http://user:pass@blah.com:3000/path?query=string#fragment')

{
  auth: 'user:pass',
  hash: '#fragment',
  host: 'blah.com:3000',
  hostname: 'blah.com',
  href: 'http://user:pass@blah.com:3000/path?query=string#fragment',
  path: '/path?query=string',
  pathname: '/path',
  port: '3000',
  protocol: 'http:',
  query: 'query=string',
  search: '?query=string'
}

var href = window.location.href
url.format(url.parse(href)) === href
```
