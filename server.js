/**
 * Created by coding on 2017-05-08.
 */
var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));

app.listen(3000, function() {
  console.log('listening on localhost:3000');
});