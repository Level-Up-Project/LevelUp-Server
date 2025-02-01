import mongoose, { Document, Schema } from 'mongoose';

// Defining the interface for the Notification document
export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  message: string;
  read: boolean;
  timestamp: Date;
}

// Define the schema for the Notification model
const NotificationSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Creating the Notification model with proper type
const Notification = mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;
