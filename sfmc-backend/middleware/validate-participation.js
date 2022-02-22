const { CustomAPIError, BadRequestError, NotFoundError } = require('../errors')
const { Participation, User, Contest } = require('../models')
const moment = require('moment')

const validateParticipation = async (req, res, next) => {
  const { contestId } = req.params
  const { userId } = req.user

  const contest = await Contest.findById(contestId)
  const participation = await Participation.findOne({ contestId, userId })

  if (!contest) {
    throw new NotFoundError('Contest Not Found.')
  }

  if (!participation) {
    throw new BadRequestError('You are not registered in this contest.')
  }

  validateContestTime(contest)

  req.contest = contest
  req.participation = participation

  next()
}

const validateContestTime = (contest) => {
  const timeSinceStart = moment().diff(moment(contest.startingTime), 'seconds')
  if (timeSinceStart < 0) {
    throw new BadRequestError('CONTEST DID NOT START')
  } else if (timeSinceStart > 60 * contest.duration) {
    throw new BadRequestError('CONTEST ENDED')
  }
}

module.exports = validateParticipation
