var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// db require ----------------------------------------db----------
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var infoSchema = new Schema({
	'name' : String,
	'age' : Number
});
var model = mongoose.model('doomcollection', infoSchema);
mongoose.connect('mongodb://localhost/doomdb');
//end of db require-----------------------------db---------------
/*
app.get('/control', function(req, res){
	res.render('controljade');
});*/
app.get('/test', function(req, res){
	res.render('testjade',{melong: '12345'});
});
app.get('/create', function(req, res){
	res.render('createjade');
});
app.get('/delete', function(req, res){
	res.render('deletejade');
});
app.get('/update', function(req, res){
	res.render('updatejade');
});
app.get('/read', function(req, res){
	res.render('readjade');
});
// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handle
/*
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
*/
/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});
app.post('/dbcreate', function(req, res){
//                      igotta write something to make db file
	var newModel = new model;
	var db = req.db;
	newModel.name = req.body.name;
	newModel.age = req.body.age;
	newModel.save(function(err){
		if(err) console.log("error when save by post");
		else { console.log("saved by post");
			res.redirect('/control');
		}

	});
});
app.post('/dbdelete', function(req, res){
	console.log(req.body);
	console.log("post recieved");
	model.remove({name: req.body.name,age: req.body.age},function(err){if(err) console.log("error occured deleted by post"); 
	else console.log("deleted by post");
	res.redirect('/control');
});

});

app.post('/dbupdate', function(req, res){
	model.update({name: req.body.currentname, age: req.body.currentage}, {$set: {name:req.body.newname, age:req.body.newage}},{multi:false},function(err,res){});

res.redirect('/control');
});
app.post('/dbread', function(req,res){ var thisage;
	model.find({name:/req.body.name/}, function(err, docs){
		for(var i=0, size=docs.length; i<size; i++){
			var id = docs[i].name;
			console.log(id);
			thisage = docs[i].age;
		}

});

	res.send(thisage);
});


/* GET home page. */
app.get('/control', function(req, res) {
  model.find({},function(err,docs){
   res.render('controljade', {title: docs});

});

});



module.exports = app;
