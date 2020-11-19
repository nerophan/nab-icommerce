import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env') })

export default {
  port: process.env.PORT || 8080,
  db: {
    url: process.env.MONGO_URL,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    database: process.env.MONGO_DB,
    port: process.env.MONGO_PORT,
    sync: process.env.DB_SYNC,
  },
  amqp: {
    url: process.env.AMQP_URL,
    activitiesQueue: process.env.QUEUE_NAME_ACTIVITIES,
  },
}
