var util = require('./util');
var Pieces = require('./pieces');
var Pawn = Pieces.pawn;
var Rook = Pieces.rook;
var Knight = Pieces.knight;
var Bishop = Pieces.bishop;
var King = Pieces.king;
var Queen = Pieces.queen;

var Board = function (options) {
  this._options = util.extend({
    x: 7,
    y: 7
  }, options);

  var WHITE = util.WHITE;
  var BLACK = util.BLACK;

  this._pieces = [];
  this._takenPieces = [];

  this._pieces.push(new Pawn(0.5, 6.5, WHITE, 'p0'));
  this._pieces.push(new Pawn(1.5, 6.5, WHITE, 'p1'));
  this._pieces.push(new Pawn(2.5, 6.5, WHITE, 'p2'));
  this._pieces.push(new Pawn(3.5, 6.5, WHITE, 'p3'));
  this._pieces.push(new Pawn(4.5, 6.5, WHITE, 'p4'));
  this._pieces.push(new Pawn(5.5, 6.5, WHITE, 'p5'));
  this._pieces.push(new Pawn(6.5, 6.5, WHITE, 'p6'));
  this._pieces.push(new Pawn(7.5, 6.5, WHITE, 'p7'));
  this._pieces.push(new Rook(0.5, 7.5, WHITE, 'r0'));
  this._pieces.push(new Knight(1.5, 7.5, WHITE, 'n0'));
  this._pieces.push(new Bishop(2.5, 7.5, WHITE, 'b0'));
  this._pieces.push(new Queen(3.5, 7.5, WHITE, 'q0'));
  this._pieces.push(new King(4.5, 7.5, WHITE, 'k0'));
  this._pieces.push(new Bishop(5.5, 7.5, WHITE, 'b1'));
  this._pieces.push(new Knight(6.5, 7.5, WHITE, 'n1'));
  this._pieces.push(new Rook(7.5, 7.5, WHITE, 'r1'));

  this._pieces.push(new Pawn(0.5, 1.5, BLACK, 'p0'));
  this._pieces.push(new Pawn(1.5, 1.5, BLACK, 'p1'));
  this._pieces.push(new Pawn(2.5, 1.5, BLACK, 'p2'));
  this._pieces.push(new Pawn(3.5, 1.5, BLACK, 'p3'));
  this._pieces.push(new Pawn(4.5, 1.5, BLACK, 'p4'));
  this._pieces.push(new Pawn(5.5, 1.5, BLACK, 'p5'));
  this._pieces.push(new Pawn(6.5, 1.5, BLACK, 'p6'));
  this._pieces.push(new Pawn(7.5, 1.5, BLACK, 'p7'));
  this._pieces.push(new Rook(0.5, 0.5, BLACK, 'r0'));
  this._pieces.push(new Knight(1.5, 0.5, BLACK, 'n0'));
  this._pieces.push(new Bishop(2.5, 0.5, BLACK, 'b0'));
  this._pieces.push(new Queen(3.5, 0.5, BLACK, 'q0'));
  this._pieces.push(new King(4.5, 0.5, BLACK, 'k0'));
  this._pieces.push(new Bishop(5.5, 0.5, BLACK, 'b1'));
  this._pieces.push(new Knight(6.5, 0.5, BLACK, 'n1'));
  this._pieces.push(new Rook(7.5, 0.5, BLACK, 'r1'));

}

Board.prototype.getPiece = function(color, id) {
  var piece = null;
  for (var i = 0; i < this._pieces.length; i++) {
    var curPiece = this._pieces[i];
    if (curPiece._id == id && curPiece._color == color) {
      piece = curPiece;
      break;
    }
  }
  return piece;
}

Board.prototype.getPieceAt = function(x, y) {
  var piece = null;
  for (var i = 0; i < this._pieces.length; i++) {
    var curPiece = this._pieces[i];
    if (Math.floor(curPiece._x) == Math.floor(x) && Math.floor(curPiece._y) == Math.floor(y)) {
      piece = curPiece;
      break;
    }
  }
  return piece;
}

Board.prototype.capturePiece = function(piece) {
  this.takenPieces = this.pieces.splice(this.pieces.indexOf(piece), 1);
}

module.exports = Board;
