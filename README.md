# ![urlite](https://cloud.githubusercontent.com/assets/640611/11125144/30a12ab0-8960-11e5-91ba-dfb682572a6c.png)

An extremely small, fast, dependency free url parser and formatter for nodejs and the web

- Very fast
- Very few lines of code
- Good test coverage
- Runs in node out of the box or in the browser with a module bundler such as browserify or webpack (commonjs)

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
```

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
