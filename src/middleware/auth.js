const jwt = require('jsonwebtoken');
const privateKey = require('../config/default.json')['development'].privateKey


const authVerifier = (req, res, next) => {
    let token = req.get('Authorization');
    if (!token)
        return res.send({ message: 'Unauthorized', status: 401, success: false });
    token = token.split(' ')[1];
    if (!token)
        return res.send({ message: 'Unauthorized', status: 401, success: false });
    try {
        const userDetails = jwt.verify(token, privateKey);
        req.userId = userDetails.id;
        next();
    }
    catch (error) {
        return res.send({ message: 'Token Expired', status: 401, success: false })
    }
}


module.exports = authVerifier;