import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env') })

export default {
  port: process.env.PORT || 8080,
  db: {
    url: process.env.PG_URL,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
    sync: process.env.DB_SYNC,
  },
  services: {
    auth: {
      url: process.env.AUTH_URL,
    }
  }
}
