const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const Contest = require('../models/Contest')
const Question = require('../models/Question')

const {updateContest} = require('./contests')

const createQuestion = async(req, res) => {

    console.log("Create Question Request")
    console.log(req.body)

    const contestId = req.body.contestId

    if(!contestId){
        throw new BadRequestError("You need to specify a contest")
    }

    console.log("contestId exists")

    const contest = Contest.findOne({_id:contestId})
    if(!contest){
        throw new BadRequestError("Contest not found")
    }

    console.log("contest found")

    const question = await Question.create(req.body)
    console.log("question created")
    
    res.status(StatusCodes.CREATED).json({ question })
}

const deleteQuestion = async(req, res) => {
    const { params: {id: questionId} } = req 

    const question = await Question.findOneAndRemove({
        _id: questionId,
    })

    if (!question) {
        throw new NotFoundError(`No contest with id ${questionId}`)
    }

    res.status(StatusCodes.OK).send("Contest Deleted")
}

const updateQuestion = async(req, res) => {

    const { params: {id: questionId} } = req 
    
    const question = await Question.findByIdAndUpdate(
        { _id: questionId },
        req.body,
        { new: true, runValidators: true }
    )

    if (!question) {
        throw new NotFoundError(`No question with id ${questionId}`)
    }

    res.status(StatusCodes.OK).json({ question })
}

module.exports = {
    createQuestion,
    deleteQuestion,
    updateQuestion,
}