import { MessageQueue } from '../types'

const handleActivityMessage = async (data: MessageQueue.IContent) => {
  console.log('handleActivityMessage', { data })
}

export default {
  handleActivityMessage,
}
