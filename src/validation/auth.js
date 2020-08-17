const Joi = require('@hapi/joi')

const validateSignUp = (reqBody) => {
    const schema = Joi.object().keys({
        fullName: Joi.string().min(3).max(20).required(),
        emailId: Joi.string().email().max(50).required(),
        password: Joi.string().min(6).max(20).required()
    })
    return schema.validate(reqBody)
}

const validateLogin = (reqBody) => {
    const schema = Joi.object().keys({
        emailId: Joi.string().email().max(50).required(),
        password: Joi.string().min(6).max(20).required()
    })
    return schema.validate(reqBody)
}


module.exports = {
    validateLogin,
    validateSignUp
}

