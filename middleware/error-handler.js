//const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    //set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Oops! Server Failure.',
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')

    customError.statusCode = 400
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate: ${Object.keys(err.keyValue)}`
    customError.statusCode = 400
  }

  if (err.name === 'CastError') {
    customError.msg = `No item found with id ${err.value}`
    customError.statusCode = 404
  }

  return res
    .status(customError.statusCode)
    .json({ ...err.data, msg: customError.msg })
}

module.exports = errorHandlerMiddleware
