import { Document, Schema, model, Model } from 'mongoose'

export interface Activity {
  type: string
  data: unknown
  ip: string
  agent: string
}

// Schema
const ActivitySchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: false
  },
  ip: {
    type: String,
    required: false
  },
  agent: {
    type: String,
    required: false
  },
}, {
  timestamps: true
})

interface ActivityBaseDocument extends Activity, Document {
}
export interface ActivityDocument extends ActivityBaseDocument {
}
export interface ActivityModel extends Model<ActivityDocument> {
}

export default model<ActivityDocument, ActivityModel>('user_activities', ActivitySchema)
