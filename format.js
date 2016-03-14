var fragments = require('./lib/fragments')
module.exports = function format (obj) {
  var result = ''
  var i = fragments.length
  while (i--) {
    var fragment = fragments[i]
    var part = obj[fragment]
    if (part) {
      if (fragment === 'protocol') {
        part += '//'
      } else if (fragment === 'auth') {
        part += '@'
      } else if (fragment === 'port') {
        part = ':' + part
      }
      result = part + result
    }
  }
  if (obj.href && obj.href.indexOf('//') === 0) result = '//' + result
  return result
}
