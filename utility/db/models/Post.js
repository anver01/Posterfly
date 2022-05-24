const { DataTypes, Model } = require('sequelize')
const sequelize = require('../dbConnection')

class Post extends Model {}

Post.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  post: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  paranoid: true,
  sequelize,
  modelName: 'Post'
})

module.exports = Post
