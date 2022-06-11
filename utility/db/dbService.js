const Post = require('./models/Post')

async function getAllPostForUser (username) {
  const posts = await Post.findAll({ where: { author: username } })
  return posts && posts.map(post => post.toJSON())
}

async function createPostForUser (body) {
  const response = await Post.create(body)
  return response
}

module.exports = {
  getAllPostForUser,
  createPostForUser
}
