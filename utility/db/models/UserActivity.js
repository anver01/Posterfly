const { DataTypes, Model } = require('sequelize')
const sequelize = require('../dbConnection')

class UserActivity extends Model {}

UserActivity.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  action: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  paranoid: true,
  sequelize,
  modelName: 'UserActivity'
})

module.exports = UserActivity
