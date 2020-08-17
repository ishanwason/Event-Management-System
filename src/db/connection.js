const { Sequelize } = require('sequelize')
const config = require('../config/default.json')['development']

const sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: 'mssql',
    host: 'localhost',
    define: {
        raw: true,
        freezeTableName: true,
    },
    logging: false,
    operatorsAliases: 0
});

// sequelize.authenticate()
// .then(()=>{
//     console.log('Connection Has Been Established with the DB')
// })
// .catch(error=>{
//     console.log('A problem encountered will connecting to DB')
// })
module.exports = sequelize;