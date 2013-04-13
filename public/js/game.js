$(document).ready(function() {
  var CANVAS_WIDTH = 400;
  var CANVAS_HEIGHT = 400;

  var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");
  var canvas = canvasElement.get(0).getContext("2d");
  canvasElement.appendTo('body');

  pieces = [];
  var board;
  var WHITE = "white";
  var BLACK = "black";

  var square = 400/8;


  var FPS = 30;

  function start() {

    initBoard();
    setInterval(function() {
      update();
      draw();
    }, 1000/FPS);
  }

  function initBoard() {
    board = new Board();
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
        pieces.push(new Pawn(player, j, pawnY, 'images/' + player + '-pawn.png'));
      }
      var peicesY = player == WHITE ? 7 : 0;
      pieces.push(new Rook(player, 0, peicesY, 'images/' + player + '-rook.png'));
      pieces.push(new Knight(player, 1, peicesY, 'images/' + player + '-knight.png'));
      pieces.push(new Bishop(player, 2, peicesY, 'images/' + player + '-bishop.png'));
      pieces.push(new Queen(player, 3, peicesY, 'images/' + player + '-queen.png'));
      pieces.push(new King(player, 4, peicesY, 'images/' + player + '-king.png'));
      pieces.push(new Bishop(player, 5, peicesY, 'images/' + player + '-bishop.png'));
      pieces.push(new Knight(player, 6, peicesY, 'images/' + player + '-knight.png'));
      pieces.push(new Rook(player, 7, peicesY, 'images/' + player + '-rook.png'));
    }
  }

  var textX = 10;
  var textY = 10;
  function update() {
    textX += 2;
    textY += 1;
  }


  function draw() {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    board.draw();
    canvas.fillStyle = "#000";
    canvas.fillText("Hello", textX, textY);
    player.draw();

    for (var i = 0; i < pieces.length; i++) {
      pieces[i].draw();
    }

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
    this.lightColor= "white";
    this.darkColor = "rgba(100, 100, 100, .4)";
    // height/width of entire board
    this.width = 400;
    this.height = 400;
  }

  Board.prototype.draw = function() {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        canvas.fillStyle = (i + j) % 2 == 0 ? this.lightColor : this.darkColor;
        canvas.fillRect(i * square, j * square, square, square);
      }
    }
  }



/** 
 * Begin pieces of the board
 */
  function Piece(player, x, y, imgUrl) {
    var self = this;
    this.player = player;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.imgLoaded = false;
    this.img.onload = function() {
      console.log("loaded!");
      self.imgLoaded = true;
    }
    console.log("url:", imgUrl);
    this.img.src = imgUrl;
  }

  Piece.prototype.draw = function() {
    if (this.imgLoaded) {
      canvas.drawImage(this.img, this.x * square, this.y * square);
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
  window.keydown = {};
  function keyName(event) {
    console.log(event.which);
    return jQuery.hotkeys.specialKeys[event.which] ||
    String.fromCharCode(event.which).toLowerCase();
  }
  $(document).bind("keydown", function(event) {
    console.log("keydown",event);
    keydown[keyName(event)] = true;
  });

  $(document).bind("keyup", function(event) {
    console.log("keyup", event);
    keydown[keyName(event)] = false;
  });

  start();

  var socket = io.connect("http://localhost:3000");
  socket.on("news", function(data) {
    console.log(data);
    socket.emit('my other event', {
      my: 'data'
    });
  });
});

