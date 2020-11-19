import { MessageQueue as MessageQueueTypes } from '../types'
import db from '../db'
import ActivityTypes from '../types/activities'



const handleActivityMessage = async (data: MessageQueueTypes.IContent) => {
  console.log('handleActivityMessage', { data })
  console.log('ActivityTypes.TYPES', ActivityTypes.TYPES)
  if (!(<any>Object).values(ActivityTypes.TYPES).includes(data.type)) {
    console.log('invalid_activity_type', data)
    return
  }
  const payload = {
    type: data.type,
    data: data.data,
    ip: data.ip,
    agent: data.agent,
  }
  try {
    const activity = await db.activities.create(payload)
    console.log('activity_created', activity)
  } catch (err) {
    console.error('activity_create_err', err)
  }
}

export default {
  handleActivityMessage,
}
