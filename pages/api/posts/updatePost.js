import { createOrUpdateUserActivity } from '../../../utility/db/dbService'

export default async function handler (req, res) {
  const body = req.body
  const response = await createOrUpdateUserActivity(body)
  return res.status(200).json(response)
}
