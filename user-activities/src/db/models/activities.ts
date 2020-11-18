import { Document, Schema, model, Model } from 'mongoose'

enum ActivityType {
  SEARCH_PRODUCTS,
  FILTER_PRODUCTS,
  VIEW_PRODUCTS,
}
export interface Activity {
  type: ActivityType;
  data: unknown;
}

// Schema
const ActivitySchema = new Schema({
  type: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
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
