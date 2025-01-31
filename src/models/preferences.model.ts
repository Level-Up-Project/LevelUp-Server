import mongoose, { Document, Schema } from 'mongoose';

// Defining the interface for the Preferences document
export interface IPreferences extends Document {
  userId: mongoose.Types.ObjectId;  // Reference to the User model
  emailNotification: boolean;  // Whether email notifications are enabled
  inAppNotification: boolean;  // Whether in-app notifications are enabled
  sessionReminder: boolean;  // Whether session reminders are enabled
  weeklySummary: boolean;  // Whether the user wants a weekly summary
  customNotifications: {
    [key: string]: boolean;  // A dynamic set of custom notifications, e.g., { "meetingUpdates": true }
  };
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the Preferences model
const PreferencesSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    emailNotification: { type: Boolean, default: true },
    inAppNotification: { type: Boolean, default: true },
    sessionReminder: { type: Boolean, default: true },
    weeklySummary: { type: Boolean, default: false },
    customNotifications: {
      type: Map,
      of: Boolean,
      default: {}
    }
  },
  { timestamps: true }
);

// Creating the Preferences model with proper type
const Preferences = mongoose.model<IPreferences>('Preferences', PreferencesSchema);

export default Preferences;
