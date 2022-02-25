const express = require('express')
const router = express.Router()

const {
    createQuestion,
    updateQuestion,
    deleteQuestion,

} = require('../controllers/questions')

router.route('/')
    .post(createQuestion)

router.route('/:id')
    .patch(updateQuestion)
    .delete(deleteQuestion)


module.exports = router