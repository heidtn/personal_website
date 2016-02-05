var express = require('express');
var path = require('path');
var glob = require("glob");
var marked = require('marked');
var hbs = require('hbs');
var fs = require('fs');
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");


var transport = nodemailer.createTransport(process.env.EMAILTPT);


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
  if(req.body.name == "" || req.body.email == "" || req.body.message == "" || req.body.human == "")
  {
  	res.render('connect', {message:'<div class="alert alert-danger"><span class="glyphicon glyphicon-alert"></span><strong>Please fill out all of the forms</strong></div>'});
  }
  if(req.body.human != '5')
  {
  	res.render('connect', {message:'<div class="alert alert-danger"><span class="glyphicon glyphicon-alert"></span><strong> Error! Please prove you are human!</strong></div>'});
  }

  transport.sendMail({
    from: req.body.name + " <" + req.body.email +" >", // sender address
    to: "nathanielheidt@gmail.com", // list of receivers
    subject: "New contact message from website", // Subject line
    text: req.body.message // plaintext body
	}, function(error, info){
	  if(error){
	      console.log('Error occured');
	      console.log(error.message);
	      res.render('connect', {message:'<div class="alert alert-danger"><span class="glyphicon glyphicon-alert"></span><strong> There was an error sending the email!</strong></div>'});
	      return;
	  }
	  console.log('Message sent successfully!' + info.response);
	  res.render('connect', {message:'<div class="alert alert-success"><strong><span class="glyphicon glyphicon-send"></span> Success! Message sent.</strong></div>'});

	  //transport.close(); // close the connection pool
	});		
});

app.listen(8080, process.env.PRIVATEIP, function () {
  console.log('Example app listening on port 3000!');
});
