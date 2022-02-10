const mongoose = require('mongoose')

const ContestSchema = new mongoose.Schema({
    startingTime:{
        type:Date,
        default: Date.now
    },
    duration:{
        type:Number,
    },
    numQuestions:{
        type:Number,
        default:0,
    },
    description:{
        type:String,
        default:'This is a contest!',
        maxlength:500,
    }
})


module.exports = mongoose.model('Contest', ContestSchema)