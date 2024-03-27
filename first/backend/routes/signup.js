const express = require('express')

const {handleSignUp} = require('../controllers/Users')


const router = express.Router();

router.post('/', handleSignUp);

module.exports = router