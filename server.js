var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send("Hi");
});

app.listen(3000);
console.log("Listening on 3000");
