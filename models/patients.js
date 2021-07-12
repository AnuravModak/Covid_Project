// const mongoose=require("mongoose");
// var passportLocalMongoose=require('passport-local-mongoose');
// var Schema=mongoose.Schema;

// var Patient=new Schema({
    
//     firstname:{
//         type:String,
//         default:""
//     },
//     lastname:{
//         type:String,
//         default:""
//     },

    // bed:{
    //     type:String,

    //     // require: true,
    //     // unique:true,
    //     // sparse:true
        
    // },

    // covid:{
    //     type:String,
    //     default:1

    // },

// });
// Patient.plugin(passportLocalMongoose);
// module.exports=mongoose.model("Patient",Patient);



const mongoose=require("mongoose");
var passportLocalMongoose=require('passport-local-mongoose');
var Schema=mongoose.Schema;

var Patient=new Schema({
    firstname:{
        type:String,
        default:""
    },
    lastname:{
        type:String,
        default:""
    },
    username:{
        type:String,
        default:""
    },
    bed:{
        type:String,
        default:""

    },
   

    covid:{
        type:String,
        default:""

    },
});

Patient.plugin(passportLocalMongoose);
module.exports=mongoose.model("Patient",Patient);