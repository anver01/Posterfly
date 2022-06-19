import { updateUsername } from '../../utility/dynamoService'

export default async function handler (req, res) {
  const body = req.body
  const response = await updateUsername(body.username, body.email)
  return res.status(200).json(response)
}
