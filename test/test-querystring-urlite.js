/* globals describe it */
var expect = require('expect.js')
var urlite = require('../querystring/urlite')

describe('querystring urlite', function () {
  it('should parse the querystring', function () {
    var url = 'proto://user:password@domain.com:3000/some/pathname?a=b#fragment'
    var parsed = {
      auth: 'user:password',
      protocol: 'proto:',
      port: '3000',
      hostname: 'domain.com',
      host: 'domain.com:3000',
      pathname: '/some/pathname',
      path: '/some/pathname?a=b',
      search: '?a=b',
      query: {
        a: 'b'
      },
      hash: '#fragment',
      href: url
    }
    expect(urlite.parse(url)).to.eql(parsed)
    expect(urlite.format(parsed)).to.eql(url)
  })

  it('should handle no query', function () {
    var url = 'proto://user:password@domain.com:3000/some/pathname#fragment'
    var parsed = {
      auth: 'user:password',
      protocol: 'proto:',
      port: '3000',
      hostname: 'domain.com',
      host: 'domain.com:3000',
      pathname: '/some/pathname',
      path: '/some/pathname',
      search: undefined,
      query: undefined,
      hash: '#fragment',
      href: url
    }
    expect(urlite.parse(url)).to.eql(parsed)
    expect(urlite.format(parsed)).to.eql(url)
  })
  it('should handle empty querystring params', function () {
    var url = 'proto://user:password@domain.com:3000/some/pathname?blah&blah2=&boop'
    var parsed = {
      auth: 'user:password',
      protocol: 'proto:',
      port: '3000',
      hostname: 'domain.com',
      host: 'domain.com:3000',
      pathname: '/some/pathname',
      path: '/some/pathname?blah&blah2=&boop',
      search: '?blah&blah2=&boop',
      query: {
        blah: '',
        blah2: '',
        boop: ''
      },
      hash: undefined,
      href: url
    }
    expect(urlite.parse(url)).to.eql(parsed)
  })
  it('should handle empty querystring values', function () {
    var url = 'proto://user:password@domain.com:3000/some/pathname?=&'
    var parsed = {
      auth: 'user:password',
      protocol: 'proto:',
      port: '3000',
      hostname: 'domain.com',
      host: 'domain.com:3000',
      pathname: '/some/pathname',
      path: '/some/pathname?=&',
      search: '?=&',
      query: {
        '': ''
      },
      hash: undefined,
      href: url
    }
    expect(urlite.parse(url)).to.eql(parsed)
  })
})
