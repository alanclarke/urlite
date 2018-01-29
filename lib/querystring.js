module.exports = function querystring (identifier) {
  function format (obj) {
    var result = ''
    for (var key in obj) {
      if (has(obj, key)) {
        var val = obj[key]
        if (isArray(val)) {
          var l = val.length
          for (var i = 0; i < l; i++) { result += '&' + key + '=' + val[i] }
        } else if (val) {
          result += '&' + key + '=' + val
        } else {
          result += '&' + key
        }
      }
    }
    return encodeURI(result.replace('&', identifier))
  }

  function parse (qs) {
    var obj = {}
    var params = decodeURI(qs || '').replace(new RegExp('\\' + identifier), '').split(/&amp;|&/)
    var l = params.length
    for (var i = 0; i < l; i++) {
      if (params[i]) {
        var index = params[i].indexOf('=')
        if (index === -1) index = params[i].length
        var key = params[i].substring(0, index)
        var val = params[i].substring(index + 1)
        if (has(obj, key)) {
          if (!isArray(obj[key])) obj[key] = [obj[key]]
          obj[key].push(val)
        } else {
          obj[key] = val
        }
      }
    }
    return obj
  }

  function has (obj, key) {
    return obj.hasOwnProperty(key)
  }

  function isArray (thing) {
    return Object.prototype.toString.call(thing) === '[object Array]'
  }

  return {
    parse: parse,
    format: format
  }
}
