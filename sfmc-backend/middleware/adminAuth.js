const User = require('../models/User')
const { UnauthenticatedError } = require('../errors')

const adminAuth = async (req, res, next) => {
  const { userId } = req.user
  try {
    const user = await User.findById(userId)
    if (user.superUser) {
      next()
    } else {
      throw new UnauthenticatedError()
    }
  } catch (error) {
    throw new UnauthenticatedError("You don't have admin privileges")
  }
}

module.exports = adminAuth
