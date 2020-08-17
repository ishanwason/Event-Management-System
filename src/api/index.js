const { loginHandler, signUpHandler } = require('./auth')
const { getEventListHandler, createEventHandler } = require('./event')

module.exports = {
    loginHandler,
    signUpHandler,
    createEventHandler,
    getEventListHandler
}