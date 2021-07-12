var authenticate=require('../authenticate')
var express = require('express');
var router = express.Router();
//addititional addings
var passport=require("passport");
var app=express();

var MongoClient=require("mongodb").MongoClient;
const assert=require('assert');
const dboper=require('./operations');
const url='mongodb://localhost:27017/';
const dbname='project_2';

const bodyParser=require("body-parser");
var User=require('../models/users');
// if you are using an object more than once in the below code then u have to use "var" instead "const"
router.use(bodyParser.json());

/* GET users listing. */
router.get('/',  authenticate.verifyUser,function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',(req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      if (req.body.password)
        user.password=req.body.password;
      // user.session=false;
      // user.token="00";
      
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});


router.post('/login',(req,res,next)=>{
  User.findOne({username:req.body.username})
  .then((user)=>{
    if (user===null){
      var err=new Error("You are not registered! Sign-Up first: "+req.body.username);
      err.status=500;
      next(err);
      // next(err);
      
    }
    else{
      if (user.password==req.body.password ){
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        console.log("Succesfull login :"+user.username+" userID: "+user._id);
        console.log(req.body,req.body.session);
        res.json({username:user.username,user_id:user._id});
      }
      else {
        var err=new Error("Incorrect username/password "+req.body.username);
        err.status=403;
        next(err);
      }
      
    }
  });
});

router.post('/redirect',(req, res,next) => { 
  var token = authenticate.getToken({_id: req.body.user_id});

  MongoClient.connect(url).then((client) => {
  const db = client.db(dbname);
  dboper.findDocuments(db,"users")
  .then((docs)=>{
    console.log("Found the document");
    dboper.updateDocument(db,{username:req.body.username},{token:token},"users");
    dboper.updateDocument(db,{username:req.body.username},{session:true},"users");

  })
  .then((result)=>{
    console.log("Documents updated");
    client.close();
    
    console.log("Database is closed");
  }).catch((err) => console.log(err));

});
  
  res.statusCode = 200;
  // res.setHeader('Content-Type', 'application/json');
  console.log(req.body.username);
  console.log(token);
  

  User.findOne({username:req.body.username})
  .then((user)=>{
    res.redirect('/home');
    
    
    // res.json({success: true, token: token, session:user.session, status: 'You are successfully logged in!'});

  },(err)=>next(err));
  // console.log("http://localhost:3000/:"+token+"/home");
  // res.redirect(":"+token+"/home");

});

router.post('/logout',(req,res,next)=>{
  console.log("connected to logout",req.body.username);
  MongoClient.connect(url).then((client) => {
    const db = client.db(dbname);
    dboper.findDocuments(db,"users")
    .then((docs)=>{
      console.log("Found the document");
      dboper.updateDocument(db,{username:req.body.username},{token:0},"users");
      dboper.updateDocument(db,{username:req.body.username},{session:false},"users");
  
    })
    .then((result)=>{
      console.log("Documents updated");
      client.close();
      
      console.log("Database is closed");
    }).catch((err) => next(err));
  
  });
  User.findOne({username:req.body.username})
  .then((user)=>{
    if (user==null) {
      var err= new Error("User does'nt Exist!! Signup First");
      err.status=403;
      next(err);
      
    }

    else{
      res.statusCode=200;
      
      // res.setHeader("Content-Type","application/json");
      res.json({username:user.username,session:false,status:"You are successfully logout"});
    }
  })
  


});




// router.post('/signup', (req, res, next) => {
//   User.findOne({username: req.body.username})
//   .then((user) => {
//     if(user != null) {
//       var err = new Error('User ' + req.body.username + ' already exists!');
//       err.status = 403;
//       next(err);
//     }
//     else {
//       return User.create({
//         username: req.body.username,
//         password: req.body.password,
//         lastname:req.body.lastname,
//         firstname:req.body.firstname});
//     }
//   })
//   .then((user) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     res.json({status: 'Registration Successful!', user: user});
//   }, (err) => next(err))
//   .catch((err) => next(err));
// });
module.exports = router;
