// channel promise for
import * as amqp from 'amqplib/callback_api'
import config from '../../../config'

interface IConnection {
  createChannel: Function
}
export interface IChannel {
  assertQueue: Function
  consume: Function
  ack: Function,
  sendToQueue: Function,
}
class Connection {
  connectionPromise: Promise<IConnection>
  channelPromise: Promise<IChannel>
  constructor() {
    this.connect()
  }
  connect() {
    this.connectionPromise = new Promise((resolve, reject) => {
      amqp.connect(config.amqp.url, (err, conn) => {
        if (err) {
          // retry after 5 seconds
          setTimeout(() => {
            this.connect()
          }, 5000)
          return reject(err)
        }
        console.log('amqp connected!')
        return resolve(conn)
      })
    })
    this.channelPromise = new Promise<IChannel>((resolve, reject) => {
      this.connectionPromise.then(conn => {
        conn.createChannel((err, ch) => {
          if (err) return reject(err)
          return resolve(ch)
        })
      }).catch(err => {
        console.error('Error on amqp connection:', err)
        reject(err)
      })
    })
  }
}

export default new Connection()
