var Board = require('./board');

function Engine(options) {

  this._board = new Board();

  this._moveQueue = [];


  setInterval(function() {
  })
}

module.exports = Engine;
