import connection from './connection'
import config from '../../../config'
import ActivityController from '../../../controllers/activities'

class Consumer {
  async start() {
    let ch
    try {
      ch = await connection.channelPromise
      if (!ch) throw new Error('Empty channel')
    } catch (err) {
      console.error('Error on amqp connection:', err)
      // restart
      setTimeout(() => this.start(), 5000)
      return
    }
    console.log('activities_channel_started')
    ch.assertQueue(config.amqp.activitiesQueue, { durable: true })
    ch.consume(config.amqp.activitiesQueue, function (msg) {
      let message_data
      try {
        message_data = JSON.parse(msg.content)
      } catch (err) {
        console.error('activities_invalid_message', err)
        ch.ack(msg)
        return
      }
      ActivityController.handleActivityMessage(message_data)
      ch.ack(msg)
    }, { noAck: false })
  }
}

export default new Consumer()
