/* globals describe it */
var expect = require('expect.js')
var format = require('../format')

describe('format', function () {
  it('should handle an empty string', function () {
    var url = ''
    expect(format({
      auth: undefined,
      protocol: undefined,
      port: undefined,
      hostname: undefined,
      host: undefined,
      pathname: undefined,
      search: undefined,
      hash: undefined,
      href: undefined
    })).to.eql(url)
  })

  it('should parse a full url', function () {
    var url = 'proto://domain.com:3000/some/pathname?query=string#fragment'
    expect(format({
      auth: undefined,
      protocol: 'proto:',
      port: '3000',
      hostname: 'domain.com',
      host: 'domain.com:3000',
      pathname: '/some/pathname',
      search: '?query=string',
      hash: '#fragment',
      href: url
    })).to.eql(url)
  })

  it('should handle auth', function () {
    var url = 'proto://user:password@domain.com:3000/some/pathname?query=string#fragment'
    expect(format({
      auth: 'user:password',
      protocol: 'proto:',
      port: '3000',
      hostname: 'domain.com',
      host: 'domain.com:3000',
      pathname: '/some/pathname',
      search: '?query=string',
      hash: '#fragment',
      href: url
    })).to.eql(url)
  })

  it('should parse a relative url', function () {
    var url = '/some/pathname?query=string#fragment'
    expect(format({
      auth: undefined,
      protocol: undefined,
      port: undefined,
      hostname: undefined,
      host: undefined,
      pathname: '/some/pathname',
      search: '?query=string',
      hash: '#fragment',
      href: url
    })).to.eql(url)
  })

  it('should handle case where there is no querystring', function () {
    var url = '/some/pathname#fragment'
    expect(format({
      auth: undefined,
      protocol: undefined,
      port: undefined,
      hostname: undefined,
      host: undefined,
      pathname: '/some/pathname',
      search: undefined,
      hash: '#fragment',
      href: url
    })).to.eql(url)
  })
})
