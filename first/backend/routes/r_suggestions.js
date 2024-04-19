const express = require('express')

const {handleShowSuggestions} = require('../controllers/Suggestions')

const router = express.Router()

router.post("/",handleShowSuggestions)


module.exports = router