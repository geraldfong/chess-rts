var util = require('./util');

var Move = function(options) {

  this._options = util.extend({
  }, options);

  this._color = options.color;
  this._id = options.id;
  this._xTile = options.xTile;
  this._yTile = options.yTile;

}

module.exports = Move;
