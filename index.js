var express = require('express');
var path = require('path');
var glob = require("glob");
var marked = require('marked');
var hbs = require('hbs');
var fs = require('fs');
var bodyParser = require('body-parser');


var app = express();
app.use("/js", express.static(__dirname + "/js"));
app.use("/resources", express.static(__dirname + "/resources"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/project_meta", express.static(__dirname + "/project_meta"));
app.use("/bootstrap", express.static(__dirname + "/bootstrap"));
app.use("/posts", express.static(__dirname + "/posts"));
app.use("/node_modules/angular-route", express.static(__dirname + "/node_modules/angular-route"));
app.use("/templates", express.static(__dirname + "/templates"));

app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/blog', function (req, res) {
  res.render('blog');
});

app.get('/posts/:id', function (req, res) {
  console.log(req.params.id);
  fs.readFile(__dirname + '/posts/' + req.params.id + '.md', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    res.render('content',{content: marked(data)});
  });

});

app.get('/get_blog_posts', function(req, res) {

	glob("posts/*.md", function (er, files) {
	  	
	  res.json(files);
	});
});

app.get('/connect', function (req, res) {
  res.render('connect');
});

app.post('/connect', function (req, res) {
  console.log(req.body);
  res.render('connect');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
