const express = require('express')
const router = express.Router()

const { getScoreboard } = require('../controllers/scoreboard')

router.get('/:contestId', getScoreboard)

module.exports = router
