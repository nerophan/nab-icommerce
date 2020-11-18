import mongoose from 'mongoose'
import config from '../config'

console.log(config)
const mongoUri = `mongodb://${config.db.user}:${config.db.password}@${config.db.url}${config.db.port ? `:${config.db.port}` : ''}/${config.db.database}`
mongoose.connect(mongoUri, { autoIndex: false })

const db = mongoose.connection

db.on('error', function (err) {
  console.error('db connection error:', err.message)
  process.exit(-1)
})
db.once('open', function callback() {
  console.info('Connected to DB!')
})

export default db