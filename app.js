//NOTE: an express server's working is very different....it renders from top to bottom...so it will render only one thing...which is the top most element

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var patientsRouter=require('./routes/patients');
// var bookRouter=require('./routes.books');

var app = express();

// const bodyParser=require('body-parser');
// app.use(bodyParser.urlencoded({extended:false}));

const mongoose = require('mongoose');

const connect=mongoose.connect('mongodb://localhost:27017/project_3', {useNewUrlParser: true, useCreateIndex:true,useUnifiedTopology: true });

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });
// view engine setup using jade......

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// ......................................
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// app.set("view options", {layout: false});

// app.set('view engine','hbs');
// app.get((req,res)=>{
//   res.render('index');
// })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
console.log(path.join(__dirname+'/bcg.jpg'));

// this is to serve static html files...


app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname+'/public/start.html'));
});

// console.log(path.join(__dirname+'/public/home.html'));

app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.get("/home",(req,res)=>{
  app.use(express.static(__dirname + '/views/home.html'));
  res.render('home');

  

});
app.use('/patients',patientsRouter);

// app.get ("/fav",(req,res)=>{
//   app.use(express.static(__dirname + '/views/fav.html'));
//   res.render('favourites');

// })








// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
