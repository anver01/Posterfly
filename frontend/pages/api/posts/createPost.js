import { createPostForUser } from '../../../utility/db/dbService'

export default async function createPost (req, res) {
  const body = req.body
  const post = await createPostForUser(body)
  return res.status(200).json(post)
}
