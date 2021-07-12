const mongoose=require("mongoose");
var passportLocalMongoose=require('passport-local-mongoose');
var Schema=mongoose.Schema;

var User=new Schema({
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
    password:{
        type:String,
        default:""
    },
    session:{
        type:Boolean,
        default:false
    },
    token:{
        type:String,
        default:0

    },
    admin:{
        type:Boolean,
        default:true
    }
});

User.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",User);