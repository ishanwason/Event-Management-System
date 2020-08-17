const Joi = require('@hapi/joi')
const moment = require('moment');

const validateEventList = (queryString) => {
    const schema = Joi.object().keys({
        pageNumber: Joi.number().integer().min(1).required(),
        pageSize: Joi.number().integer().min(1).required(),
        fromDate: Joi.date().allow(''),
        toDate: Joi.date().allow('')
    })
    return schema.validate(queryString)
};

const validateEventCreate = (reqBody) => {
    const schema = Joi.array().min(1).required().items(
        Joi.object().keys({
            name: Joi.string().min(3).max(50).required(),
            description: Joi.string().min(5).required(),
            date: Joi.date().min(moment().format()).required(),
            isActive: Joi.boolean().required()
        }).unknown(false)
    )
    return schema.validate(reqBody)
}

module.exports = {
    validateEventCreate,
    validateEventList
}