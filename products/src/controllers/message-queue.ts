import { Request } from 'express'
import {
  messageQueue as messageQueueService
} from '../services'
import {
  Activities
} from '../types'

export interface ISendActivityMessageState {
  activityType: Activities.TYPES
}
const sendActivityMessage = async (req: Request): Promise<void> => {
  const {
    activityType
  } = <ISendActivityMessageState>req.state
  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress
  const agent = req.headers['user-agent']
  const data = {
    url: req.originalUrl
  }
  const activity: Activities.IActivity = {
    type: activityType,
    ip: ip.toString(),
    agent,
    data,
  }
  messageQueueService.publisher.sendActivity(activity)
}

class MessageQueue {
  sendActivityMessage = sendActivityMessage
}

export default new MessageQueue()
