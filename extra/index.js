var urlite = require('../index')
var qs = require('../lib/querystring')('?')
var hs = require('../lib/querystring')('#')
var fragments = require('../lib/fragments')

function parse (url) {
  var parsed = urlite.parse(url)
  if (parsed.auth) parsed.auth = decodeAuth(parsed.auth)
  parsed.search = parsed.search ? qs.parse(parsed.search) : {}
  parsed.hash = parsed.hash ? hs.parse(parsed.hash) : {}
  return parsed
}

function format (parsed) {
  var encoded = {}
  var i = fragments.length
  while (i--) {
    encoded[fragments[i]] = parsed[fragments[i]]
  }
  if (typeof encoded.auth !== 'string') encoded.auth = encoded.auth && encodeAuth(encoded.auth)
  if (typeof encoded.search !== 'string') encoded.search = encoded.search && qs.format(encoded.search)
  if (typeof encoded.hash !== 'string') encoded.hash = encoded.hash && hs.format(encoded.hash)
  return urlite.format(encoded)
}

module.exports = {
  parse: parse,
  format: format
}

function decodeAuth (auth) {
  var split = auth.split(':')
  return {
    user: split[0],
    password: split[1]
  }
}

function encodeAuth (auth) {
  return auth.user + ':' + auth.password
}
