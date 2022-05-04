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
      expect(qs.parse('?a&b&c')).to.eql({ a: true, b: true, c: true })
    })
    it('should handle empty querystring keys', function () {
      expect(qs.parse('?=')).to.eql({ '': true })
    })
    it('should handle undefined querystring', function () {
      expect(qs.parse()).to.eql({})
    })
    it('should handle badly encoded parts', function () {
      expect(qs.parse('foo=%C1%A4%BB%F3+%C3%B3%B8%AE+%B5%C7%BE%FA%BD%C0%B4%CF%B4%D9&bar=boz')).to.eql({
        bar: 'boz',
        foo: '%C1%A4%BB%F3+%C3%B3%B8%AE+%B5%C7%BE%FA%BD%C0%B4%CF%B4%D9'
      })
    })
  })

  describe('format', function () {
    it('should format a querystring', function () {
      expect(qs.format({ a: 'b', b: 'c' })).to.eql('?a=b&b=c')
    })
    it('should handle arrays', function () {
      expect(qs.format({ a: ['b', 'c'] })).to.eql('?a=b&a=c')
    })
    it('should handle bools', function () {
      expect(qs.format({ a: true, b: false, c: 4 })).to.eql('?a&c=4')
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
