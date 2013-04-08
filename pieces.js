var util = require('./util');

var Pawn = function(x, y, color, id, options) {
  this._x = x;
  this._y = y;
  this._color = color;
  this._id = id;
  this._options = util.extend({
  }, options);
}

Pawn.prototype.isValidMove = function(xTileDest, yTileDest) {
  var xTile = Math.floor(this._x);
  var yTile = Math.floor(this._y);
  
  if (xTileDest < 0 || yTileDest < 0 || xTileDest > this._board._x || yTileDest > this._board._y || (xTile == xTileDest && yTile == yTileDest)) {
    return false;
  }

  if ((yTile - yTileDest != 1 && this._player == WHITE)
    || (yTile - yTileDest != -1 && this._player == BLACK)) {
    return false;
  }

  if (xTile == xTileDest) {
    return true;
  }

  if (!(xTile - xTileDest == 1 || xTile - xTileDest == -1)) {
    return false;
  }

  var tempPiece = this._board.getPieceAt(xTileDest, yTileDest);
  if (tempPiece == null || tempPiece.color == this._color) {
    return false;
  }
  return true;
}

var Rook = function(x, y, color, id, options) {
  this._x = x;
  this._y = y;
  this._color = color;
  this._id = id;
  this._options = util.extend({
  }, options);
}

Rook.prototype.isValidMove = function(xTileDest, yTileDest) {
  var xTile = Math.floor(this._x);
  var yTile = Math.floor(this._y);
  
  if (xTileDest < 0 || yTileDest < 0 || xTileDest > this._board._x || yTileDest > this._board._y || (xTile == xTileDest && yTile == yTileDest)) {
    return false;
  }

  if (xTile == xTileDest || yTile == yTileDest){
    return true;
  }
  return false;
}

var Knight = function(x, y, color, id, options) {
  this._x = x;
  this._y = y;
  this._color = color;
  this._id = id;
  this._options = util.extend({
  }, options);
}

Knight.prototype.isValidMove = function(xTileDest, yTileDest) {
  var xTile = Math.floor(this._x);
  var yTile = Math.floor(this._y);

  if (xTileDest < 0 || yTileDest < 0 || xTileDest > this._board._x || yTileDest > this._board._y || (xTile == xTileDest && yTile == yTileDest)) {
    return false;
  }

  if (Math.abs(xTile - xTileDest) + Math.abs(yTile - yTileDest) == 3 && Math.abs(xTile - xTileDest) != 3 && Math.abs(yTile - yTileDest) != 3) {
    return true;
  }
  return false;
}

var Bishop = function(x, y, color, id, options) {
  this._x = x;
  this._y = y;
  this._color = color;
  this._id = id;
  this._options = util.extend({
  }, options);
}

Bishop.prototype.isValidMove = function(xTileDest, yTileDest) {
  var xTile = Math.floor(this._x);
  var yTile = Math.floor(this._y);

  if (xTileDest < 0 || yTileDest < 0 || xTileDest > this._board._x || yTileDest > this._board._y || (xTile == xTileDest && yTile == yTileDest)) {
    return false;
  }

  if (Math.abs(xTile - xTileDest) - Math.abs(yTile - yTileDest) == 0) {
    return true;
  }
  return false;
}

var King = function(x, y, color, id, options) {
  this._x = x;
  this._y = y;
  this._color = color;
  this._id = id;
  this._options = util.extend({
  }, options);
}

King.prototype.isValidMove = function(xTileDest, yTileDest) {
  var xTile = Math.floor(this._x);
  var yTile = Math.floor(this._y);

  if (xTileDest < 0 || yTileDest < 0 || xTileDest > this._board._x || yTileDest > this._board._y || (xTile == xTileDest && yTile == yTileDest)) {
    return false;
  }

  if (Math.abs(xTile - xTileDest) <= 1 && Math.abs(yTile - yTileDest) <= 1) {
    return true;
  }
  return false;
}

var Queen = function(x, y, color, id, options) {
  this._x = x;
  this._y = y;
  this._color = color;
  this._id = id;
  this._options = util.extend({
  }, options);
}

Queen.prototype.isValidMove = function(xTileDest, yTileDest) {
  var xTile = Math.floor(this._x);
  var yTile = Math.floor(this._y);

  if (xTileDest < 0 || yTileDest < 0 || xTileDest > this._board._x || yTileDest > this._board._y || (xTile == xTileDest && yTile == yTileDest)) {
    return false;
  }

  if (Math.abs(xTile - xTileDest) - Math.abs(yTile - yTileDest) == 0) {
    return true;
  }
  
  if (xTile == xTileDest || yTile == yTileDest){
    return true;
  }
  return false;
}

module.exports = {
  pawn : Pawn,
  rook : Rook,
  knight : Knight,
  bishop : Bishop,
  king : King,
  queen : Queen
};
