module.exports = {
  format: function format (obj) {
    var result = ''
    for (var key in obj) if (obj.hasOwnProperty(key)) result += '&' + key + '=' + obj[key]
    return result.replace('&', '?')
  },
  parse: function parse (qs) {
    var i = 0
    var obj = {}
    var params = (qs || '').replace(/\?/, '').split(/&amp;|&/)
    var l = params.length
    for (i; i < l; i++) {
      if (params[i]) {
        var keyValue = params[i].match(/([^=]+)(?:=(.*))?/) || []
        obj[keyValue[1]] = keyValue[2]
      }
    }
    return obj
  }
}
