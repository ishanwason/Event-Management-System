const { validateLogin, validateSignUp } = require('./auth')
const { validateEventCreate, validateEventList } = require('./event')

module.exports = {
    validateLogin,
    validateSignUp,
    validateEventCreate,
    validateEventList
}