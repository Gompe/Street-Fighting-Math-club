const express = require('express')
const router = express.Router()

const {
    getAllContests,
    getContest,
    createContest,
    updateContest,
    deleteContest,

} = require('../controllers/contests')

router.route('/')
    .get(getAllContests)
    .post(createContest)

router.route('/:id')
    .get(getContest)
    .patch(updateContest)
    .delete(deleteContest)


module.exports = router