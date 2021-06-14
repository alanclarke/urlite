/* globals describe it */
var Benchmark = require('benchmark')
var suite = new Benchmark.Suite()
var inputs = ['https://user:pass@example.com/']
var parse = require('../parse')
var url = require('url')
var fastUrlParser = require('fast-url-parser')
var asAddress = require('url-parse-as-address')
var minUrl = require('min-url')
var urlParse = require('url-parse')
var urlparser = require('urlparser')
var expect = require('expect.js')

describe.skip('benchmarks', function () {
  this.timeout(0)
  it('should be one of the fastest', function (done) {
    suite
      .add('require("url").parse', function () {
        inputs.forEach(url.parse)
      })
      .add('require("fast-url-parser").parse', function () {
        inputs.forEach(fastUrlParser.parse)
      })
      .add('require("url-parse-as-address")', function () {
        inputs.forEach(asAddress)
      })
      .add('require("min-url").parse', function () {
        inputs.forEach(minUrl.parse)
      })
      .add('require("url-parse")', function () {
        inputs.forEach(urlParse)
      })
      .add('require("urlparser").parse', function () {
        inputs.forEach(urlparser.parse)
      })
      .add('require("urlite").parse', function () {
        inputs.forEach(parse)
      })
      .on('cycle', function (event) {
        console.log(String(event.target))
      })
      .on('complete', function () {
        try {
          expect(this.filter('fastest').pluck('name')).to.contain('require("urlite").parse')
          done()
        } catch (e) {
          done(e)
        }
      })
      .run({
        'async': false
      })
  })
})
