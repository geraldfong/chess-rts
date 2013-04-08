var express = require('express');
var util = require('./util');
var Engine = require('./engine');

var Server = function(options) {

  this._options = util.extend({
  }, options);

  this._app = express();

  this._engine = new Engine();

  this._app.get('/', function(req, res) {
    res.send("Hi");
  });

  this._app.listen(3000);
  console.log("Listening on 3000");
}

var server = new Server();

module.exports = Server;
