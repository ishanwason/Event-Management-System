const { AuthService } = require('../../services')
const { validateSignUp, validateLogin } = require('../../validation')
const bycrypt = require('bcrypt')
const { generateToken } = require('../../utilities')

const signUpHandler = async (req, res) => {
    const { error } = validateSignUp(req.body);
    if (error)
        return res.send({ message: 'Bad Request', success: false, status: 400 })
    try {
        const userDetails = await AuthService.login(req.body.emailId)
        if (userDetails)
            return res.send({ message: 'Account Already Exists', success: false, status: 409 })
        const password = await bycrypt.hash(req.body.password, 12)
        const created = await AuthService.signUp({ ...req.body, password, createdBy: req.userId, updatedBy: req.userId })
        if (!created)
            return res.send({ message: 'Account Couldn\'t Be Created', success: false, status: 409 })
        const token = generateToken({ id: created.id })
        res.header('Authorization', token).send({ message: 'Login Successfully', payload: created, success: true, status: 201 })
    }
    catch (error) {
        return res.send({ message: 'Something Went Wrong', exception: error.message, success: false, status: 500 })
    }
}

const loginHandler = async (req, res) => {
    const { error } = validateLogin(req.body)
    if (error)
        return res.send({ message: 'Bad Request', status: 400, success: false })
    try {
        const userDetails = await AuthService.login(req.body.emailId)
        if (!userDetails)
            return res.send({ message: 'Account Doesn\'t Exist', status: 409, success: false })
        const verified = await bycrypt.compare(req.body.password, userDetails.password);
        if (!verified)
            return res.send({ message: 'Email or Password is not correct', success: false, status: 403 })
        const token = generateToken({ id: userDetails.id })
        res.header('Authorization', token).send({ message: 'Login Successfully', payload: userDetails, status: 200, success: true })
    }
    catch (error) {
        console.log(error.message)
        return res.send({ message: 'Something Went Wrong', exception: error.message, success: false, status: 500 })
    }
}

module.exports = {
    signUpHandler,
    loginHandler
}