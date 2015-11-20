module.exports = { parse: parse, stringify: stringify }

function stringify (obj) {
  var result = ''
  for (var key in obj) if (has(obj, key)) {
    var val = obj[key]
    if (isArray(val)) {
      var l = val.length
      for (var i = 0; i < l; i++) { result += '&' + key + '=' + val[i] }
    } else {
      result += '&' + key + '=' + val
    }
  }
  return result.replace('&', '?')
}

function parse (qs) {
  var obj = {}
  var params = (qs || '').replace(/\?/, '').split(/&amp;|&/)
  var l = params.length
  for (var i = 0; i < l; i++) {
    if (params[i]) {
      var keyVal = params[i].match(/([^=]+)(?:=(.*))?/)
      var key = keyVal[1]
      var val = keyVal[2]
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
