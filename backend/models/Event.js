const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    date:{
        type:String,
        required:true
    },

    venue:{
        type:String,
        required:true
    },

    image:{
        type:String
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

});


module.exports = mongoose.model("Event",eventSchema);