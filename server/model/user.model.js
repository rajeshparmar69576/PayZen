const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:false,
        trim:true,
        maxLength:50
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    password:{
        type:String,
        required:true,
        maxLength:6
    },
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        maxLength:30,
        minLength:3

    }
})

const User = mongoose.model('User',userSchema)
module.exports = User