import connection, { IChannel } from './connection'
import config from '../../../config'
import { Activities } from '../../../types'

class Publisher {
  async send(message: Activities.IActivity) {
    let ch: IChannel
    try {
      ch = await connection.channelPromise
    } catch (err) {
      console.error('Error on amqp connection:', err)
      return
    }
    ch.assertQueue(config.amqp.activitiesQueue, { durable: true })
    ch.sendToQueue(config.amqp.activitiesQueue, Buffer.from(JSON.stringify(message)), { persistent: true })
  }
}

export default new Publisher()
