var util = {
  WHITE: 'white',
  BLACK: 'black',

  extend: function(dest, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        dest[key] = source[key];
      }
    }
    return dest;
  }
}

module.exports = util;
