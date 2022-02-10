const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const Contest = require('../models/Contest')
const Question = require('../models/Question')

const getAllContests = async(req, res) => {
    
    const contests = await Contest.find()
    res.status(StatusCodes.OK).json({ contests, count: contests.length })

}

const getContest = async(req, res) => {

    console.log("Request Received")

    const { params: {id: contestId} } = req 

    const contest = await Contest.findOne({
        _id: contestId,
    })

    if (!contest) {
        throw new NotFoundError(`No contest with id ${contestId}`)
    }

    const questions = await Question.find({contest : contestId})

    res.status(StatusCodes.OK).json({ contest, questions })
}

const createContest = async(req, res) => {

    const contest = await Contest.create(req.body)
    res.status(StatusCodes.CREATED).json({ contest })
}

const deleteContest = async(req, res) => {
    const { params: {id: contestId} } = req 

    const contest = await Contest.findOneAndRemove({
        _id: contestId,
    })

    if (!contest) {
        throw new NotFoundError(`No contest with id ${contestId}`)
    }

    res.status(StatusCodes.OK).send("Contest Deleted")
}

const updateContest = async(req, res) => {

    const { user: {userId}, params: {id: contestId} } = req 
    const { body: {description} } = req

    if (!description) {
        throw new BadRequestError('Company or Position fileds cannot be empty')
    }

    const contest = await Contest.findByIdAndUpdate(
        { _id: contestId },
        req.body,
        { new: true, runValidators: true }
    )

    if (!contest) {
        throw new NotFoundError(`No contest with id ${contestId}`)
    }

    res.status(StatusCodes.OK).json({ contest })
}

module.exports = {
    getAllContests,
    getContest,
    createContest,
    deleteContest,
    updateContest,
}