const sequelize = require('./connection')
const { Event, User } = require('../model/index')


sequelize.sync()
    .then(() => {
        console.log('The Tables Have Been Successfully Created')
    })
    .catch((error) => {
        console.log('The Tables Couldn\'t be created')
    })

sequelize.authenticate()
    .then(() => {
        console.log('Connection Has Been Established with the DB')
    })
    .catch(error => {
        console.log('A problem encountered will connecting to DB')
    });

module.exports = sequelize;