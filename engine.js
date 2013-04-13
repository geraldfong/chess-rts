var util = require('./util');
var Board = require('./board');

function Engine(options) {

  this._options = util.extend({
    clockSpeed: 200 // in ms
  }, options);

  this._board = new Board();


  this._moveQueue = [];

  var self = this;

  setInterval(function() {
    var move = self.getNextMove();
    if (move != null) {
      var newLoc = self.execMove(move);
    }
    for (var i = 0; i < self._board._pieces.length; i++) {
      var piece = self._board._pieces[i];
      self.updatePos(piece);
    }
  }, this._options.clockSpeed);
}

Engine.prototype.getNextMove = function() {
  var curMove = null;
  while (this._moveQueue.length > 0 && curMove != null) {
    curMove = this._moveQueue.splice(0, 1);
    if (!this.isValidMove(curMove)) {
      curMove = null;
    }
  }
};

Engine.prototype.isValidMove = function(move) {
  var piece = this._board.getPiece(move._color, move._id);
  return piece.isValidMove(move._xTile, move._yTile);
}

Engine.prototype.execMove = function(move) {
  var piece = this._board.getPiece(move._color, move._id);

  if (piece == null) {
    console.log("Unable to find piece for move ", move);
  }

  piece._xDest = move._xDest;
  piece._yDest = move._yDest;
  piece._speed = 1;
}

Engine.prototype.updatePos = function(piece) {
  var xDiff = piece._xDest - piece._x;
  var yDiff = piece._yDest - piece._y;
  var magnitude = Math.pow(Math.pow(xDiff, 2) + Math.pow(yDiff, 2), .5);
  var oldX = piece._x;
  var oldY = piece._y;
  piece._x += xDiff/magnitude * piece._speed;
  piece._y += yDiff/magnitude * piece._speed;

  if (Math.floor(oldX) == Math.floor(piece._x) && Math.floor(oldY) == Math.floor(piece._y)) {
    return;
  }

  var destPiece = this._board.getPieceAt(piece._x, piece._y);
  if (destPiece == null) {
    return;
  }

  if (destPiece._color == piece._color) {
    piece._xDest = Math.floor(oldX) + .5;
    piece._yDest = Math.floor(oldY) + .5;
  } else {
    this._board.capturePiece(destPiece);
  }

}

module.exports = Engine;
