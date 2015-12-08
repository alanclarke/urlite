# ![urlite](https://cloud.githubusercontent.com/assets/640611/11125144/30a12ab0-8960-11e5-91ba-dfb682572a6c.png)

A very small, fast, dependency free url parser and formatter for nodejs and the web

- fast
- few lines of code
- 100% test coverage

## usage
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

// optional querystring parser/formatter (not bundled by default)
var querystring = require('urlite/querystring')

querystring.parse('?a=b&b=c') // -> { a: 'b', b: 'c'] }
querystring.format({ a: 'b', b: 'c'] }) // -> '?a=b&b=c'
// array support
querystring.parse('?a=b&a=c') // -> { a: ['b', 'c'] }
querystring.format({ a: ['b', 'c'] }) // -> '?a=b&a=c'
```

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
