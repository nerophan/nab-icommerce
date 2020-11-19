import ActivitiesConsumer from './activities'
import { Activities } from '../../../types'

export const sendActivity = async (msg: Activities.IActivity): Promise<void> => {
  ActivitiesConsumer.send(msg)
}
