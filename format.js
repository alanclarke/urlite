var fragments = require('./lib/fragments')

module.exports = function format (obj) {
  var i = 0
  var l = fragments.length
  var result = ''
  for (i; i < l; i++) {
    var fragment = fragments[i]
    var part = obj[fragment]
    if (part && fragment === 'protocol' && part.substr(2) !== '//') part += '//'
    if (part && fragment === 'auth') part += '@'
    if (part && fragment === 'port') result += ':'
    if (part && fragment !== 'slashes') result += part
  }
  return result
}
