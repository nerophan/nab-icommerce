import mongoose from 'mongoose'
import config from '../config'

console.log(config)
const mongoUri = `${config.db.url}/${config.db.database}`
mongoose.connect(mongoUri, {
  autoIndex: false,
  user: config.db.user,
  pass: config.db.password
})

const db = mongoose.connection

db.on('error', function (err) {
  console.error('db connection error:', err.message)
  process.exit(-1)
})
db.once('open', function callback() {
  console.info('Connected to DB!')
})

export default db