$(document).ready(function() {
  var CANVAS_WIDTH = 400;
  var CANVAS_HEIGHT = 400;

  var canvasElement = $("<canvas id='gameCanvas' width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");
  var canvas = canvasElement.get(0).getContext("2d");
  canvasElement.appendTo('body');

  var board;
  var WHITE = "white";
  var BLACK = "black";

  var square = 400/8;

  var selector;

  var FPS = 30;

  function start() {

    board = new Board();
    setInterval(function() {
      update();
      draw();
    }, 1000/FPS);
  }

  var textX = 10;
  var textY = 10;
  function update() {
    textX += 2;
    textY += 1;
  }


  function draw() {
    canvas.fillStyle = "white";
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    board.draw();
    canvas.fillStyle = "#000";
    canvas.fillText("Hello", textX, textY);
    player.draw();


  }

  var player = {
    color: "#00A",
    x: 220,
    y: 270,
    width: 32,
    height: 32,
    draw: function() {
      canvas.fillStyle = this.color;
      canvas.fillRect(this.x, this.y, this.width, this.height);
    }
  };

  function Board() {
    this._pieces = [];
    this._lightColor= "white";
    this._darkColor = "rgba(100, 100, 100, .4)";
    // height/width of entire board
    this._width = 400;
    this._height = 400;

    this.init();
  }

  Board.prototype.init = function() {
    var pieces = this._pieces;
    for (var i = 0; i < 2; i++) {
      var player, pawnY, imgUrl;
      if (i == 0) {
        player = WHITE;
        pawnY = 6;
        playerName = "white";
      } else {
        player = BLACK;
        pawnY = 1;
      }
      for (var j = 0; j < 8; j++) {
        pieces.push(new Pawn(player, j, pawnY, 'img/' + player + '-pawn.png'));
      }
      var peicesY = player == WHITE ? 7 : 0;
      pieces.push(new Rook(player, 0, peicesY, 'img/' + player + '-rook.png'));
      pieces.push(new Knight(player, 1, peicesY, 'img/' + player + '-knight.png'));
      pieces.push(new Bishop(player, 2, peicesY, 'img/' + player + '-bishop.png'));
      pieces.push(new Queen(player, 3, peicesY, 'img/' + player + '-queen.png'));
      pieces.push(new King(player, 4, peicesY, 'img/' + player + '-king.png'));
      pieces.push(new Bishop(player, 5, peicesY, 'img/' + player + '-bishop.png'));
      pieces.push(new Knight(player, 6, peicesY, 'img/' + player + '-knight.png'));
      pieces.push(new Rook(player, 7, peicesY, 'img/' + player + '-rook.png'));

    }
    this._selector = new Selector();
  }

  Board.prototype.getPieceAt = function(x, y) {
    var piece = null;
    for (var i = 0; i < this._pieces.length; i++) {
      var curPiece = this._pieces[i];
      if (curPiece._x == x && curPiece._y == y) {
        piece = curPiece;
        break;
      }
    }
    return piece;
  }

  Board.prototype.draw = function() {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        canvas.fillStyle = (i + j) % 2 == 0 ? this._lightColor : this._darkColor;
        canvas.fillRect(i * square, j * square, square, square);
      }
    }

    for (var i = 0; i < this._pieces.length; i++) {
      this._pieces[i].draw();
    }

    this._selector.draw();
  }

  Board.prototype.clickSquare = function(tileX, tileY) {
    var curPiece = this.getPieceAt(tileX, tileY);
    if (curPiece == null) {
      this._selector.unselect(tileX, tileY);
      return;
    }
    this._selector.select(tileX, tileY);
    console.log(curPiece);
    var validMoves = [];
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if (curPiece.isValidMove(i, j)) {
          validMoves.push([i, j]);

        }
      }
    }
    this._selector.highlight(validMoves);
  }

  Board.prototype.unclickSquare = function(tileX, tileY) {
    this._selector.unselect(tileX, tileY);
  }


  /** 
  * Begin pieces of the board
  */
  function Piece(player, x, y, imgUrl) {
    var self = this;
    this.player = player;
    this._x = x;
    this._y = y;
    this.img = new Image();
    this.imgLoaded = false;
    this.img.onload = function() {
      self.imgLoaded = true;
    }
    this.img.src = imgUrl;
  }

  Piece.prototype.draw = function() {
    if (this.imgLoaded) {
      canvas.drawImage(this.img, this._x * square, this._y * square);
    }
  }

  Piece.prototype.update = function() {
    console.log("ERROR: Peice update not implemented");

  }

  function Pawn(player, x, y, imgUrl) {
    Piece.call(this, player, x, y, imgUrl);
    this.symbol = "P";
  }

  Pawn.prototype = Object.create(Piece.prototype, {
    draw: {
      value: function() {
        Piece.prototype.draw.apply(this);
      },
      enumerable: true,
      configurable: true,
      writable: true
    }

  });
  Pawn.prototype.isValidMove = function(xTileDest, yTileDest) {
    var xTile = Math.floor(this._x);
    var yTile = Math.floor(this._y);

    if (xTileDest < 0 || yTileDest < 0 || xTileDest > board._x || yTileDest > board._y || (xTile == xTileDest && yTile == yTileDest)) {
      return false;
    }

    if ((yTile - yTileDest != 1 && this._player == WHITE)
      || (yTile - yTileDest != -1 && this._player == BLACK)) {
        return false;
      }
  console.log(xTile, xTileDest);

      if (xTile == xTileDest) {
        return true;
      }

      if (!(xTile - xTileDest == 1 || xTile - xTileDest == -1)) {
        return false;
      }

      var tempPiece = board.getPieceAt(xTileDest, yTileDest);
      if (tempPiece == null || tempPiece.color == this._color) {
        return false;
      }
      return true;
  }

  function Knight(player, x, y, imgUrl) {
    Piece.call(this, player, x, y, imgUrl);
    this.symbol = "N";
  }

  Knight.prototype = Object.create(Piece.prototype, {
    draw: {
      value: function() {
        Piece.prototype.draw.apply(this);
      },
      enumerable: true,
      configurable: true,
      writable: true
    }

  });
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
  function Rook(player, x, y, imgUrl) {
    Piece.call(this, player, x, y, imgUrl);
    this.symbol = "R";
  }

  Rook.prototype = Object.create(Piece.prototype, {
    draw: {
      value: function() {
        Piece.prototype.draw.apply(this);
      },
      enumerable: true,
      configurable: true,
      writable: true
    }

  });
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

  function Bishop(player, x, y, imgUrl) {
    Piece.call(this, player, x, y, imgUrl);
    this.symbol = "B";
  }

  Bishop.prototype = Object.create(Piece.prototype, {
    draw: {
      value: function() {
        Piece.prototype.draw.apply(this);
      },
      enumerable: true,
      configurable: true,
      writable: true
    }

  });

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

  function King(player, x, y, imgUrl) {
    Piece.call(this, player, x, y, imgUrl);
    this.symbol = "K";
  }

  King.prototype = Object.create(Piece.prototype, {
    draw: {
      value: function() {
        Piece.prototype.draw.apply(this);
      },
      enumerable: true,
      configurable: true,
      writable: true
    }

  });

  function Queen(player, x, y, imgUrl) {
    Piece.call(this, player, x, y, imgUrl);
    this.symbol = "Q";
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

  Queen.prototype = Object.create(Piece.prototype, {
    draw: {
      value: function() {
        Piece.prototype.draw.apply(this);
      },
      enumerable: true,
      configurable: true,
      writable: true
    }

  });

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

  function Selector() {
    this._active = false;
    this._x = null;
    this._y = null;
    this._activeColor = "rgba(50, 200, 70, .3)";
    this._validColor = "rgba(200, 50, 200, .3)";
    this._validCoords = null;
  }

  Selector.prototype.select = function(tileX, tileY) {
    this._x = tileX * square;
    this._y = tileY * square;
    this._active = true;
  }

  Selector.prototype.unselect = function() {
    this._active = false;
  }

  Selector.prototype.draw = function() {
    if (this._active) {
      canvas.fillStyle = this._activeColor;
      canvas.fillRect(this._x, this._y, square, square);
      for (var i = 0; i < this._validCoords.length; i++) {
        var coord = this._validCoords[i];
        canvas.fillStyle = this._validColor;
        canvas.fillRect(coord[0] * square, coord[1] * square, square, square);
      }
    }
  }

  Selector.prototype.highlight = function(coords) {
    this._validCoords = coords;
  }

  $("body").click(function (e) {
    if (e.target.id == "gameCanvas") {
      var offset = $("#gameCanvas").offset();
      var activeX = Math.floor((e.pageX - offset.left) / square);
      var activeY = Math.floor((e.pageY - offset.top) / square);
      board.clickSquare(activeX, activeY);
    } else {
      board.unclickSquare(activeX, activeY);
    }
  });

  var socket = io.connect("http://localhost:3000");
    socket.on("news", function(data) {
      console.log(data);
      socket.emit('my other event', {
        my: 'data'
      });
    });

    start();
});

