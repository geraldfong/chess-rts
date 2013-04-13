var express = require('express');
var util = require('./util');
var Engine = require('./engine');
var ejs = require('ejs');
var socketio = require('socket.io');
var httpServer = require('http');

var Server = function(options) {

  this._options = util.extend({
  }, options);

  this._app = express();

  this._engine = new Engine();

  this._app.use(express.static(__dirname+'/public'));


  var self = this;
  this._app.engine('.html', require('ejs').__express);

  this._app.set('views', __dirname + '/views');

  this._app.set('view engine', 'html');

  this._app.get('/', function(req, res) {
    res.render("index");
  });


  
  var server = httpServer.createServer(this._app)
  var io = socketio.listen(server);
  io.sockets.on('connection', function(socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function(data) {
      console.log(data);
    });
  });

  server.listen(3000);
  console.log("Listening on 3000");

};

var server = new Server();

module.exports = Server;
