import { getAllPosts } from '../../../utility/db/dbService'

export default async function handler (req, res) {
  const postOffset = req.params?.offset || 0
  const posts = await getAllPosts(postOffset)
  res.status(200).json(posts)
}
