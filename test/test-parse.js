/* globals describe it */
var expect = require('expect.js')
var parse = require('../parse')

describe('parse', function () {
  it('should handle an empty string', function () {
    expect(parse('')).to.eql({
      auth: undefined,
      protocol: undefined,
      port: undefined,
      hostname: undefined,
      host: undefined,
      pathname: undefined,
      path: undefined,
      search: undefined,
      query: undefined,
      hash: undefined,
      href: ''
    })
  })

  it('should parse a full url', function () {
    var url = 'proto://domain.com:3000/some/pathname?query=string#fragment'
    expect(parse(url)).to.eql({
      auth: undefined,
      protocol: 'proto:',
      port: '3000',
      hostname: 'domain.com',
      host: 'domain.com:3000',
      pathname: '/some/pathname',
      path: '/some/pathname?query=string',
      search: '?query=string',
      query: 'query=string',
      hash: '#fragment',
      href: url
    })
  })

  it('should handle auth', function () {
    var url = 'proto://user:password@domain.com:3000/some/pathname?query=string#fragment'
    expect(parse(url)).to.eql({
      auth: 'user:password',
      hash: '#fragment',
      host: 'domain.com:3000',
      hostname: 'domain.com',
      href: url,
      path: '/some/pathname?query=string',
      pathname: '/some/pathname',
      port: '3000',
      protocol: 'proto:',
      query: 'query=string',
      search: '?query=string'
    })
  })

  it('should parse a relative url', function () {
    var url = '/some/pathname?query=string#fragment'
    expect(parse(url)).to.eql({
      auth: undefined,
      protocol: undefined,
      port: undefined,
      hostname: undefined,
      host: undefined,
      pathname: '/some/pathname',
      path: '/some/pathname?query=string',
      search: '?query=string',
      query: 'query=string',
      hash: '#fragment',
      href: url
    })
  })

  it('should handle case where there is no querystring', function () {
    var url = '/some/pathname#fragment'
    expect(parse(url)).to.eql({
      auth: undefined,
      protocol: undefined,
      port: undefined,
      hostname: undefined,
      host: undefined,
      pathname: '/some/pathname',
      path: '/some/pathname',
      search: undefined,
      query: undefined,
      hash: '#fragment',
      href: url
    })
  })

  it('should handle case where there is no path', function () {
    var url = 'http://dev---www-sitting--duck-com.poxy.com:666?_q_portal_protocol=http'
    expect(parse(url)).to.eql({
      href: url,
      hash: undefined,
      search: '?_q_portal_protocol=http',
      pathname: undefined,
      port: '666',
      hostname: 'dev---www-sitting--duck-com.poxy.com',
      auth: undefined,
      protocol: 'http:',
      host: 'dev---www-sitting--duck-com.poxy.com:666',
      query: '_q_portal_protocol=http',
      path: '?_q_portal_protocol=http'
    })
  })

  it('should handle javascript protocol', function () {
    var url = 'javascript:alert("node is awesome");'
    expect(parse(url)).to.eql({
      auth: undefined,
      protocol: 'javascript:',
      port: undefined,
      hostname: undefined,
      host: undefined,
      pathname: 'alert("node is awesome");',
      path: 'alert("node is awesome");',
      search: undefined,
      query: undefined,
      hash: undefined,
      href: url
    })
  })

  it('should handle @ signs in the path', function () {
    var url = 'http://localhost:4400/@qubit/layer@2.20.47/lib/layer_editor.js'
    expect(parse(url)).to.eql({
      href: 'http://localhost:4400/@qubit/layer@2.20.47/lib/layer_editor.js',
      hash: undefined,
      search: undefined,
      pathname: '/@qubit/layer@2.20.47/lib/layer_editor.js',
      port: '4400',
      hostname: 'localhost',
      auth: undefined,
      protocol: 'http:',
      host: 'localhost:4400',
      query: undefined,
      path: '/@qubit/layer@2.20.47/lib/layer_editor.js'
    })
  })

  it('should handle other cases taken from node code & RFC 3986', function () {
    var cases = [{
      url: 'http://nodejs.org/docs/latest/api/url.html#url_url_format_urlobj',
      result: {
        protocol: 'http:',
        auth: undefined,
        host: 'nodejs.org',
        port: undefined,
        hostname: 'nodejs.org',
        hash: '#url_url_format_urlobj',
        search: undefined,
        query: undefined,
        pathname: '/docs/latest/api/url.html',
        path: '/docs/latest/api/url.html',
        href: 'http://nodejs.org/docs/latest/api/url.html#url_url_format_urlobj'
      }
    }, {
      url: 'http://blog.nodejs.org/',
      result: {
        protocol: 'http:',
        auth: undefined,
        host: 'blog.nodejs.org',
        port: undefined,
        hostname: 'blog.nodejs.org',
        hash: undefined,
        search: undefined,
        query: undefined,
        pathname: '/',
        path: '/',
        href: 'http://blog.nodejs.org/'
      }
    }, {
      url: 'https://encrypted.google.com/search?q=url&q=site:npmjs.org&hl=en',
      result: {
        protocol: 'https:',
        auth: undefined,
        host: 'encrypted.google.com',
        port: undefined,
        hostname: 'encrypted.google.com',
        hash: undefined,
        search: '?q=url&q=site:npmjs.org&hl=en',
        query: 'q=url&q=site:npmjs.org&hl=en',
        pathname: '/search',
        path: '/search?q=url&q=site:npmjs.org&hl=en',
        href: 'https://encrypted.google.com/search?q=url&q=site:npmjs.org&hl=en'
      }
    }, {
      url: 'some.ran/dom/url.thing?oh=yes#whoo',
      result: {
        protocol: undefined,
        auth: undefined,
        host: undefined,
        port: undefined,
        hostname: undefined,
        hash: '#whoo',
        search: '?oh=yes',
        query: 'oh=yes',
        pathname: 'some.ran/dom/url.thing',
        path: 'some.ran/dom/url.thing?oh=yes',
        href: 'some.ran/dom/url.thing?oh=yes#whoo'
      }
    }, {
      url: 'https://user:pass@example.com/',
      result: {
        protocol: 'https:',
        auth: 'user:pass',
        host: 'example.com',
        port: undefined,
        hostname: 'example.com',
        hash: undefined,
        search: undefined,
        query: undefined,
        pathname: '/',
        path: '/',
        href: 'https://user:pass@example.com/'
      }
    }, {
      url: '/wiki/Help:IPA',
      result: {
        protocol: undefined,
        auth: undefined,
        host: undefined,
        port: undefined,
        hostname: undefined,
        hash: undefined,
        search: undefined,
        query: undefined,
        pathname: '/wiki/Help:IPA',
        path: '/wiki/Help:IPA',
        href: '/wiki/Help:IPA'
      }
    }, {
      url: 'http://:pass@example.org:123/some/directory/file.html?query=string#fragment',
      result: {
        protocol: 'http:',
        auth: ':pass',
        host: 'example.org:123',
        port: '123',
        hostname: 'example.org',
        hash: '#fragment',
        search: '?query=string',
        query: 'query=string',
        pathname: '/some/directory/file.html',
        path: '/some/directory/file.html?query=string',
        href: 'http://:pass@example.org:123/some/directory/file.html?query=string#fragment'
      }
    }]
    for (var i = 0; i < cases.length; i++) {
      expect(parse(cases[i].url)).to.eql(cases[i].result)
    }
  })
})
