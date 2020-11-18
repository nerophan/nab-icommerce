import connection from './connection'
import config from '../../../config'
import ActivityController from '../../../controllers/activities'

class Consumer {
  start() {
    connection.channelPromise.then(ch => {
      ch.assertQueue(config.amqp.activitiesQueue, { durable: true });
      ch.consume(config.amqp.activitiesQueue, function (msg) {
        const message_data = JSON.parse(msg.content);
        ActivityController.handleActivityMessage(message_data)
        ch.ack(msg)
      }, { noAck: false });
    }).catch(err => {
      console.error('Error on amqp connection:', err);
    })
  }
}

export default new Consumer()
