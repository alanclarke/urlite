var urlite = require('../index')
var qs = require('./index')

function parse (url) {
  var parsed = urlite.parse(url)
  parsed.query = parsed.search && qs.parse(parsed.search)
  return parsed
}

function format (parsed) {
  parsed.search = parsed.query && qs.stringify(parsed.query)
  return urlite.format(parsed)
}

module.exports = {
  parse: parse,
  format: format
}
