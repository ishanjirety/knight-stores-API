const mongoose = require('mongoose')

    const UserSchema = new mongoose.Schema({
      username:{
        type:String,
        required:[true,"Username could not be empty"],
        unique:[true,"Username already exists"]
        },
      password:String,
      securityQuestion:{type:String,required:true},
      answer:{type:String,required:true},
    })
    
    const User = mongoose.model("User",UserSchema)
    
    module.exports = User