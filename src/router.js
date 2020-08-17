const express = require('express')
const { authVerifier } = require('./middleware')

const router = express.Router();

const { loginHandler, signUpHandler, createEventHandler, getEventListHandler } = require('./api');

//GET REQUESTS
router.get('/api/event/', authVerifier, getEventListHandler)
//POST REQUESTS
router.post('/api/auth/login', loginHandler)
router.post('/api/auth/signup', signUpHandler)
router.post('/api/event/', authVerifier, createEventHandler)


module.exports = router;