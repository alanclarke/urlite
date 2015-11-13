var pattern = require('./lib/pattern')
var fragments = require('./lib/fragments')
module.exports = function parse (url) {
  var parts = {}
  parts.href = url
  var matches = url.match(pattern)
  var l = fragments.length
  while (l--) { parts[fragments[l]] = matches[l + 1] }
  parts.host = (parts.hostname && parts.port) ? parts.hostname + ':' + parts.port : parts.hostname
  parts.query = parts.search && parts.search.substr(1)
  parts.path = parts.search ? (parts.pathname ? parts.pathname + parts.search : parts.search) : parts.pathname
  return parts
}
