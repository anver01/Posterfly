const { Sequelize } = require('sequelize')
const { mysqlConfig } = require('../constants')

const sequelize = new Sequelize(mysqlConfig)

async function test () {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

module.exports = sequelize
