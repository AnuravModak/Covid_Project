// var authenticate=require('../authenticate')
// var express = require('express');
// var patientsRouter = express.Router();
// //addititional addings
// var passport=require("passport");
// var app=express();

// var MongoClient=require("mongodb").MongoClient;
// const assert=require('assert');
// const dboper=require('./operations');
// const url='mongodb://localhost:27017/';
// // var myUrl='mongodb://localhost:27017/project_2'
// const dbname='project_2';

// const bodyParser=require("body-parser");
// var Patient=require('../models/patients');
// // if you are using an object more than once in the below code then u have to use "var" instead "const"
// patientsRouter.use(bodyParser.json());



// // router.post('/add',(req,res,next)=>{
// //     Patient.findOne({bed:req.body.bed})
// //     .then((patient)=>{
// //         if (patient!=null){
//             // console.log("Found");
//             // var err=new Error('Bed ' + req.body.bed + ' already occupied!');
//             // err.status=403;
//             // next(err);
// //         }
// //         else{
// //             console.log("Not Found");
// //             return Patient.create({
// //                 firstname: req.body.firstname,
// //                 lastname: req.body.lastname,
// //                 bed:req.body.bed,
// //                 covid:req.body.covid
// //               });
// //             }

// // })
// // .then((patient) => {
// //     res.statusCode = 200;
// //     res.setHeader('Content-Type', 'application/json');
// //     res.json({status: 'Registration Successful!', patient: patient});
// //   }, (err) => next(err))
// //   .catch((err) => next(err));

// // });


// // patientsRouter.post('/add',(req,res,next)=>{
// //     Patient.findOne({bed:req.body.bed})
// //     .then((patient)=>{
// //         console.log("Found");
// //         if (patient!=null){
// //             console.log("Found");
// //             var err=new Error('Bed ' + req.body.bed + ' already occupied!');
// //             err.status=403;
// //             next(err);
// //         }
// //         else{
// //             console.log("Not Found");
            
// //             MongoClient.connect(url).then((client) => {
// //                 const db = client.db(dbname);
// //                 dboper.findDocuments(db,"patients")
// //                 .then((docs)=>{
// //                   console.log("Found the document",docs);
// //                   var doc={firstname:req.body.firstname,lastname:req.body.lastname,bed:req.body.bed,covid:req.body.covid};

// //                   dboper.insertDocument(db,doc,"patients");
              
// //                 })
// //                 .then((result)=>{
// //                   console.log("Documents updated");
// //                   client.close();
                  
// //                   console.log("Database is closed");
// //                 }).catch((err) => next(err));
              
// //               });
// //               res.statusCode=200;
// //               res.setHeader('Content-Type','application/json');
// //               res.json({success:"Success"});

// //         }

// //     });

// // });



// patientsRouter.post('/add',(req,res,next)=>{
//     Patient.find({bed:req.body.bed})
//     .then((patient)=>{
//         if (patient.length>0){
//             console.log("Found",patient);
//             var err=new Error('Bed ' + req.body.bed + ' already occupied!');
//             err.status=403;
//             res.statusCode=403;
//             res.setHeader('Content-Type','application/json');
//             res.json({err:err});
//         }
//         else{
//             console.log("Not Found",patient);
            
//             MongoClient.connect(url).then((client) => {
//                 const db = client.db(dbname);
//                 dboper.findDocuments(db,"patients")
//                 .then((docs)=>{
//                 //   console.log("Found the document",docs);
//                   var doc={firstname:req.body.firstname,lastname:req.body.lastname,bed:req.body.bed,covid:req.body.covid};

//                   dboper.insertDocument(db,doc,"patients");
              
//                 })
//                 .then((result)=>{
//                   console.log("Documents updated");
//                   client.close();
                  
//                   console.log("Database is closed");
//                 }).catch((err) => next(err));
              
//               });
//               res.statusCode=200;
//               res.setHeader('Content-Type','application/json');
//               res.json({success:"Success"});

//         }

//     });

// });


// patientsRouter.delete('/remove',(req,res,next)=>{
    

// })





  




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
// module.exports = patientsRouter;






var authenticate=require('../authenticate')
var express = require('express');
var patientsRouter = express.Router();
//addititional addings
var passport=require("passport");
var app=express();

var MongoClient=require("mongodb").MongoClient;
const assert=require('assert');
const dboper=require('./operations');
const url='mongodb://localhost:27017/';
const dbname='project_3';

const bodyParser=require("body-parser");
var Patient=require('../models/patients');
// if you are using an object more than once in the below code then u have to use "var" instead "const"
patientsRouter .use(bodyParser.json());

/* GET users listing. */
patientsRouter .get('/',  authenticate.verifyUser,function(req, res, next) {
  res.send('respond with a resource');
});

patientsRouter.get('/patients',(req,res,next)=>{
  MongoClient.connect(url).then((client)=>{
    const db=client.db(dbname);
    dboper.findDocuments(db,"patients")
    .then((docs)=>{
      console.log(docs);
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(docs);
    })
    .then((resp)=>{
      console.log("Documents downloaded");
      client.close();
      console.log("Database is closed");
    }).catch((err) => next(err));



  })
  

})

patientsRouter .post('/add',(req, res, next) => {
  Patient.register(new Patient({username: req.body.bed,firstname:req.body.firstname,lastname:req.body.lastname,covid:req.body.covid,bed:req.body.bed}), req.body.bed,
     (err, patient) => {
    if(err) {
        console.log("First");
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
        // console.log("Not Found",patient);
         res.statusCode=200;
         res.setHeader("Content-Type",'application/json');
         res.json({status:"Successfully Assigned bed"});

    }
  });
});

patientsRouter.post('/remove',(req,res,next)=>{
  Patient.findOneAndDelete({username:req.body.bed})
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","application/json");
    res.json({status:"Deleted"});
  })

});





patientsRouter.post('/update',(req,res,next)=>{
  MongoClient.connect(url).then((client) => {
    const db = client.db(dbname);
    dboper.findDocuments(db,"patients")
    .then((docs)=>{
      console.log("Found the document");
      Patient.findOne({username:req.body.bed})
      .then((patient)=>{
        if (patient==null){
          
          res.statusCode=500;
          res.setHeader("Content-Type",'application/json');
          res.json({success:"Patient not Found"});


        }
        else{
          dboper.updateDocument(db,{username:req.body.bed},{covid:req.body.covid},"patients");
          res.statusCode=200;
          res.setHeader("Content-Type",'application/json');
          res.json({success:"Success"});

        }
      })
    
    })
    
  
  });  


});




module.exports = patientsRouter ;
