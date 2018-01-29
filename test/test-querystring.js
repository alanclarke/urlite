/* globals describe it */
var expect = require('expect.js')
var qs = require('../lib/querystring')('?')
describe('querystring', function () {
  describe('parse', function () {
    it('should parse a querystring', function () {
      expect(qs.parse('?a=b&b=c')).to.eql({ a: 'b', b: 'c' })
    })
    it('should handle html encoded entities', function () {
      expect(qs.parse('?a=b&amp;b=c')).to.eql({ a: 'b', b: 'c' })
    })
    it('should handle arrays', function () {
      expect(qs.parse('?a=b&a=c&&a=d')).to.eql({ a: ['b', 'c', 'd'] })
    })
    it('should handle empty querystring values', function () {
      expect(qs.parse('?&&&')).to.eql({})
    })
    it('should handle empty querystring values', function () {
      expect(qs.parse('?a&b&c')).to.eql({ a: '', b: '', c: '' })
    })
    it('should handle empty querystring keys', function () {
      expect(qs.parse('?=')).to.eql({ '': '' })
    })
    it('should handle undefined querystring', function () {
      expect(qs.parse()).to.eql({})
    })
  })

  describe('format', function () {
    it('should format a querystring', function () {
      expect(qs.format({ a: 'b', b: 'c' })).to.eql('?a=b&b=c')
    })
    it('should handle arrays', function () {
      expect(qs.format({ a: ['b', 'c'] })).to.eql('?a=b&a=c')
    })
    it('should handle empty objects', function () {
      expect(qs.format({})).to.eql('')
    })
    it('should guard against things attached to the prototype', function () {
      var F = function () {}
      F.prototype.a = 'b'
      var f = new F()
      expect(qs.format(f)).to.eql('')
    })
  })
})
