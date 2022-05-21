import { JsonDB } from 'node-json-db'
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

const db = new JsonDB(new Config('posts', true, false, '/'))

export async function getPosts () {
  return db.getData('/all')
}
