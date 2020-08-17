const sequelize = require('../db/connection')
const { DataTypes } = require('sequelize')


const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    fullName: {
        type: DataTypes.STRING(20),

        allowNull: false
    },
    emailId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    freezeTableName: true
});

module.exports = User;