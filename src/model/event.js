const sequelize = require('../db/connection')
const { DataTypes } = require('sequelize')


const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE(3),
        allowNull: false,
        unique: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    updatedBy: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    freezeTableName: true
});

module.exports = Event;