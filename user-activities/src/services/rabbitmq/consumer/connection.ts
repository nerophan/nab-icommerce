// channel promise for
import * as amqp from 'amqplib/callback_api'
import config from '../../../config'

interface IConnection {
  createChannel: Function
}
interface IChannel {
  assertQueue: Function
  consume: Function
  ack: Function
}
class Connection {
  connectionPromise: Promise<IConnection>
  channelPromise: Promise<IChannel>
  constructor() {
    this.connectionPromise = new Promise((resolve, reject) => {
      amqp.connect(config.amqp.url, function (err, conn) {
        if (err) return reject(err);
        return resolve(conn);
      });
    })
    this.channelPromise = new Promise<IChannel>((resolve, reject) => {
      this.connectionPromise.then(conn => {
        conn.createChannel(function (err, ch) {
          if (err) return reject(err);
          return resolve(ch);
        });
      }).catch(err => {
        console.error('Error on amqp connection:', err);
        reject(err);
      })
    })
  }
}

export default new Connection()
