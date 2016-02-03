var express = require('express');
var app = express();
app.use("/js", express.static(__dirname + "/js"));
app.use("/resources", express.static(__dirname + "/resources"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/project_meta", express.static(__dirname + "/project_meta"));
app.use("/bootstrap", express.static(__dirname + "/bootstrap"));

var path = require('path');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/blog', function (req, res) {
  res.sendFile(path.join(__dirname + '/blog.html'));
});

app.get('/connect', function (req, res) {
  res.sendFile(path.join(__dirname + '/connect.html'));
});

app.post('/connect', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
