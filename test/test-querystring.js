/* globals describe it */
var expect = require('expect.js')
var qs = require('../lib/querystring')
describe('querystring', function () {
  describe('parse', function () {
    it('should parse a querystring', function () {
      expect(qs.parse('?a=b&b=c')).to.eql({ a: 'b', b: 'c' })
    })
    it('should handle html encoded entities', function () {
      expect(qs.parse('?a=b&amp;b=c')).to.eql({ a: 'b', b: 'c' })
    })
  })

  describe('format', function () {
    it('should format a querystring', function () {
      expect(qs.format({ a: 'b', b: 'c' })).to.eql('?a=b&b=c')
    })
  })
})
