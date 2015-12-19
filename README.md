# ![urlite](https://cloud.githubusercontent.com/assets/640611/11125144/30a12ab0-8960-11e5-91ba-dfb682572a6c.png)

A very small, fast, dependency free url parser and formatter for nodejs and the web

- fast
- few lines of code
- 100% test coverage

## why is it so small and fast?
It extracts all url fragments in a single step, using one massive regex

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

// querystring parser/formatter utility
var querystring = require('urlite/querystring')

querystring.parse('?a=b&b=c') // -> { a: 'b', b: 'c'] }
querystring.format({ a: 'b', b: 'c'] }) // -> '?a=b&b=c'
// array support
querystring.parse('?a=b&a=c') // -> { a: ['b', 'c'] }
querystring.format({ a: ['b', 'c'] }) // -> '?a=b&a=c'


// querystring parsing version of urlite
var url = require('urlite/querystring/urlite')
var result = url.parse('http://user:pass@blah.com:3000/path?query=string#fragment')
result.query // -> { "query": "string" }
```

# comparison
```
File size:

NAME                    SIZE        SIZE (minified)
urlite                  3.02 kB     0.957 kB
urlparser               5.82 kB     1.57 kB
url-parse               12 kB       2.89 kB
url                     46.5 kB     11.8 kB
min-url                 25.6 kB     12.6 kB
fast-url-parser         55.2 kB     15 kB
url-parse-as-address    78.7 kB     22.7 kB
```

```
Performance:

require("urlite").parse             2,210,417 ops/sec ±0.90% (95 runs sampled)
require("fast-url-parser").parse    2,047,302 ops/sec ±0.89% (95 runs sampled)
require("urlparser").parse          631,561 ops/secs ±0.87% (92 runs sampled)
require("min-url").parse            343,680 ops/sec ±1.16% (93 runs sampled)
require("url-parse")                334,385 ops/sec ±1.03% (97 runs sampled)
require("url").parse                140,836 ops/sec ±1.26% (94 runs sampled)
require("url-parse-as-address")     135,691 ops/sec ±0.94% (95 runs sampled)
```

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
