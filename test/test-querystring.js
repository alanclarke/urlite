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

  describe('stringify', function () {
    it('should stringify a querystring', function () {
      expect(qs.stringify({ a: 'b', b: 'c' })).to.eql('?a=b&b=c')
    })
    it('should handle arrays', function () {
      expect(qs.stringify({ a: ['b', 'c'] })).to.eql('?a=b&a=c')
    })
    it('should handle empty objects', function () {
      expect(qs.stringify({})).to.eql('')
    })
    it('should handle undefined object values', function () {
      expect(qs.stringify({a: undefined, b: 2})).to.eql('?a=&b=2')
    })
    it('should handle falsy values except undefined properly', function () {
      expect(qs.stringify({a: '', c: 32, b: '', d: 4, e: 0, f: false})).to.eql('?a=&c=32&b=&d=4&e=0&f=false')
    })
    it('should guard against things attached to the prototype', function () {
      var F = function () {}
      F.prototype.a = 'b'
      var f = new F()
      expect(qs.stringify(f)).to.eql('')
    })
  })
})
