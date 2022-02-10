const mongoose = require('mongoose')

const QuestionSchema = mongoose.Schema({
    description:{
        type:String,
        required:true,
        maxlength:500,
    },
    answer:{
        type:Number,
        required:true,
    },
    contestId:{
        type: mongoose.Types.ObjectId,
        ref: "Contest",
        required:true,
    }
})

module.exports = mongoose.model('Question', QuestionSchema)

