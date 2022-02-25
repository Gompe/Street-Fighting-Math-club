const express = require('express')
const router = express.Router()

const { createParticipation } = require('../controllers/participations')

router.post('/:contestId', createParticipation)
module.exports = router
