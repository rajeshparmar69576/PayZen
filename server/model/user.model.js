const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:false,
        trim:true,
    },
    password:{
        type:String,
        required:true,
       
    },
    userName:{
        type:String,
        required:true,
        unique:true,
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User