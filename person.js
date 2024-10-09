const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        requied : true
    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        requied:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    }
})


//create person model
const person = mongoose.model('person',personSchema);
module.exports=person;