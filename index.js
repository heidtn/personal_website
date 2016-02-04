var express = require('express');
var app = express();
app.use("/js", express.static(__dirname + "/js"));
app.use("/resources", express.static(__dirname + "/resources"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/project_meta", express.static(__dirname + "/project_meta"));
app.use("/bootstrap", express.static(__dirname + "/bootstrap"));
app.use("/posts", express.static(__dirname + "/posts"));
app.use("/node_modules/angular-route", express.static(__dirname + "/node_modules/angular-route"));
app.use("/templates", express.static(__dirname + "/templates"));



var path = require('path');
var glob = require("glob")


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/blog', function (req, res) {
  res.sendFile(path.join(__dirname + '/blog.html'));
});

app.get('/blog/*', function (req, res) {
  res.send
});

app.get('/get_blog_posts', function(req, res) {

	glob("posts/*.md", function (er, files) {
	  	
	  res.json(files);
	});
});

app.get('/connect', function (req, res) {
  res.sendFile(path.join(__dirname + '/connect.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
