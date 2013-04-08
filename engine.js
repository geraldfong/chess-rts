var util = require('./util');
var Board = require('./board');

function Engine(options) {
  this._options = util.extend({
  }, options);

  this._board = new Board();


  this._moveQueue = [];



  setInterval(function() {
  })
}

module.exports = Engine;
