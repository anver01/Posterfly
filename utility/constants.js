const mysqlConfig = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: 'mysql',
  port: process.env.DB_PORT,
  host: process.env.DB_HOST
}

const USER_ACTIONS = {
  LIKE: 'like',
  UNLIKE: 'unlike'
}

module.exports = { mysqlConfig, USER_ACTIONS }
