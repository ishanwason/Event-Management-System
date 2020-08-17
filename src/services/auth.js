const { User } = require('../model')


class AuthService {
    static async login(emailId) {
        return await User.findOne({
            where: {
                emailId
            }
        })
    }
    static async signUp({ fullName, emailId, password, createdBy, updatedBy }) {
        return await User.create({
            fullName,
            emailId,
            password,
            createdBy,
            updatedBy
        })
    }
}

module.exports = AuthService;