require('dotenv').config()
require('express-async-errors')

// extra security packages

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const express = require('express')
const app = express()

// connectDB
const connectDB = require('./db/connect')

const authenticateUser = require('./middleware/authentication')
const adminAuth = require('./middleware/adminAuth')

// routers
const adminRouter = require('./routes/admin')
const authRouter = require('./routes/auth')
const playRouter = require('./routes/play')

const participationsRouter = require('./routes/participations')
const contestsRouter = require('./routes/contests')
const questionsRouter = require('./routes/questions')
const graderRouter = require('./routes/grader')

const testRouter = require('./routes/test')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const validateParticipation = require('./middleware/validate-participation')

/* ===== Turn on after testing ===== */

app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100000, // limit each IP to 100 requests per windowMs
  })
)

app.use(helmet())
app.use(cors())
app.use(xss())
app.use(express.json())

// extra packages

// routes
/*
app.use((req, res, next) => {
  console.log('REQUEST:')
  console.log(req.method)
  console.log(req.url)
  next()
})
*/

app.use('/api/v1/admin', authenticateUser, adminAuth, adminRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/contests', contestsRouter)
app.use('/api/v1/questions', authenticateUser, adminAuth, questionsRouter)
app.use('/api/v1/grader', authenticateUser, graderRouter)
app.use('/api/v1/participations', authenticateUser, participationsRouter)
app.use(
  '/api/v1/play/:contestId',
  authenticateUser,
  validateParticipation,
  playRouter
)

app.use('/api/v1/test/scoreboard', testRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
