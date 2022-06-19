const Post = require('./models/Post')
const UserActivity = require('./models/UserActivity')

async function getAllPosts ({ offset = 0 }) {
  const posts = await Post.findAll({
    include: [{
      model: UserActivity,
      // attributes: {
      //   include: [[Sequelize.literal(`(Select * from UserActivities where UserActivities.user = ${username})`), 'this']]
      // },
      required: false
    }],
    order: [['createdAt', 'DESC']],
    limit: 20,
    offset
  })
  return posts && posts.map(post => post.toJSON())
}

async function createPostForUser (body) {
  const response = await Post.create(body)
  return response
}

async function createOrUpdateUserActivity (body) {
  const activity = await UserActivity.findOne({ where: { user: body.user, postId: body.postId } })
  if (activity) {
    activity.action = body.action
    activity.save()
    return activity
  } else return await UserActivity.create(body)
}

module.exports = {
  getAllPosts,
  createPostForUser,
  createOrUpdateUserActivity
}
