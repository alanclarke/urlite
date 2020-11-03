# ![urlite](https://cloud.githubusercontent.com/assets/640611/11125144/30a12ab0-8960-11e5-91ba-dfb682572a6c.png)

A very small, fast, dependency free url parser and formatter for nodejs and the web

- fast
- few lines of code
- 100% test coverage

## why is it so small and fast?
It extracts all url fragments in a single step using one massive regex

## usage
```js
npm install --save urlite

var url = require('urlite')

url.parse('http://user:pass@blah.com:3000/path?query=string#fragment')

{
  auth: 'user:pass',
  hash: '#fragment',
  hostname: 'blah.com',
  href: 'http://user:pass@blah.com:3000/path?query=string#fragment',
  path: '/path?query=string',
  pathname: '/path',
  port: '3000',
  protocol: 'http:',
  search: '?query=string'
}

var href = window.location.href
url.format(url.parse(href)) === href
```

## Urlite extra
An extended version of urlite is available at `urlite/extra`. This includes helpful features such as querystring, hash and auth parsing:

```js
// version of urlite with additional extras like querystring and auth parsing
var url = require('urlite/extra')
var parsed = url.parse('http://user:pass@blah.com:3000/path?a=b#c=d')
parsed.search // -> { a: "b" }
parsed.search.a = 'c'
parsed.hash // -> { c: "d" }
parsed.hash.c = 'e'
parsed.auth // -> { user: 'user', password: 'password' }
url.format(parsed) // -> 'http://user:pass@blah.com:3000/path?a=c#c=e'
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



## Want to work on this for your day job?

This project was created by the Engineering team at Qubit. As we use open source libraries, we make our projects public where possible.

We’re currently looking to grow our team, so if you’re a JavaScript engineer and keen on ES2016 React+Redux applications and Node micro services, why not get in touch? Work with like minded engineers in an environment that has fantastic perks, including an annual ski trip, yoga, a competitive foosball league, and copious amounts of yogurt.

Find more details on our Engineering site. Don’t have an up to date CV? Just link us your Github profile! Better yet, send us a pull request that improves this project.`
Contact GitHub API Training Shop Blog About
