const jwt = require('jsonwebtoken')
const privateKey = require('../config/default.json')['development'].privateKey;


const generateToken = (body) => {
    const token = jwt.sign(body, privateKey, {
        // algorithm: 'RS256',
        expiresIn: '10m'
    })
    return token;
}

module.exports = {
    generateToken
}