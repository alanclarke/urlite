var urlite = require('../index')
var qs = require('../lib/querystring')('?')

function parse (url) {
  var parsed = urlite.parse(url)
  if (typeof parsed.auth === 'string') parsed.auth = parsed.auth && decodeAuth(parsed.auth)
  if (typeof parsed.search === 'string') parsed.search = parsed.search && qs.parse(parsed.search)
  return parsed
}

function format (parsed) {
  if (typeof parsed.auth !== 'string') parsed.auth = parsed.auth && encodeAuth(parsed.auth)
  if (typeof parsed.search !== 'string') parsed.search = parsed.search && qs.format(parsed.search)
  return urlite.format(parsed)
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
