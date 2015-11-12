/* globals describe it */
var expect = require('expect.js')
var qs = require('../querystring')
describe('querystring', function () {
  describe('parse', function () {
    it('should parse a querystring', function () {
      expect(qs.parse('?a=b&b=c')).to.eql({ a: 'b', b: 'c' })
    })
    it('should handle html encoded entities', function () {
      expect(qs.parse('?a=b&amp;b=c')).to.eql({ a: 'b', b: 'c' })
    })
    it('should handle arrays', function () {
      expect(qs.parse('?a=b&a=c')).to.eql({ a: ['b', 'c'] })
    })
  })

  describe('stringify', function () {
    it('should stringify a querystring', function () {
      expect(qs.stringify({ a: 'b', b: 'c' })).to.eql('?a=b&b=c')
    })
    it('should handle arrays', function () {
      expect(qs.stringify({ a: ['b', 'c'] })).to.eql('?a=b&a=c')
    })
  })
})
