/* globals describe it */
var expect = require('expect.js')
var urlite = require('../extra')

describe('querystring urlite', function () {
  it('should parse extras', function () {
    var url = 'proto://user:password@domain.com:3000/some/pathname?a=b#fragment'
    var parsed = {
      auth: { user: 'user', password: 'password' },
      protocol: 'proto:',
      port: '3000',
      hostname: 'domain.com',
      pathname: '/some/pathname',
      path: '/some/pathname?a=b',
      search: {
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
      auth: { user: 'user', password: 'password' },
      protocol: 'proto:',
      port: '3000',
      hostname: 'domain.com',
      pathname: '/some/pathname',
      path: '/some/pathname',
      search: undefined,
      hash: '#fragment',
      href: url
    }
    expect(urlite.parse(url)).to.eql(parsed)
    expect(urlite.format(parsed)).to.eql(url)
  })

  it('should handle no auth', function () {
    var url = 'proto://domain.com:3000/some/pathname#fragment'
    var parsed = {
      auth: undefined,
      protocol: 'proto:',
      port: '3000',
      hostname: 'domain.com',
      pathname: '/some/pathname',
      path: '/some/pathname',
      search: undefined,
      hash: '#fragment',
      href: url
    }
    expect(urlite.parse(url)).to.eql(parsed)
    expect(urlite.format(parsed)).to.eql(url)
  })

  it('should handle empty querystring params', function () {
    var url = 'proto://user:password@domain.com:3000/some/pathname?blah&blah2=&boop'
    var parsed = {
      auth: { user: 'user', password: 'password' },
      protocol: 'proto:',
      port: '3000',
      hostname: 'domain.com',
      pathname: '/some/pathname',
      path: '/some/pathname?blah&blah2=&boop',
      search: {
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
      auth: { user: 'user', password: 'password' },
      protocol: 'proto:',
      port: '3000',
      hostname: 'domain.com',
      pathname: '/some/pathname',
      path: '/some/pathname?=&',
      search: {
        '': ''
      },
      hash: undefined,
      href: url
    }
    expect(urlite.parse(url)).to.eql(parsed)
  })
})
