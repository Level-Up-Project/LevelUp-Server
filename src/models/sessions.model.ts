import mongoose, { Document, Schema } from 'mongoose';

// Defining the interface for the Session document
export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  type: string; // e.g., 'webinar', 'meeting', etc.
  slot: string; // e.g., 'morning', 'afternoon', 'evening'
  host: mongoose.Types.ObjectId; // Reference to the host (User model)
  joinee: mongoose.Types.ObjectId[]; // Array of users who join the session
  feedback: mongoose.Types.ObjectId; // Reference to feedback (Feedback model)
  recording: string; // URL or path to the session recording
  startTime: Date;
  endTime: Date;
  status: string; // e.g., 'scheduled', 'completed', 'cancelled'
}

// Define the schema for the Session model
const SessionSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true }, // e.g., 'webinar', 'meeting', etc.
    slot: { type: String, required: true }, // e.g., 'morning', 'afternoon'
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    joinee: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] }, // Array of joinee user references
    feedback: { type: mongoose.Schema.Types.ObjectId, ref: 'Feedback', required: true }, // Reference to the feedback document
    recording: { type: String, default: '' }, // URL or path to the recording file
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { type: String, required: true, default: 'scheduled' } // e.g., 'scheduled', 'completed', 'cancelled'
  },
  { timestamps: true }
);

// Creating the Session model with proper type
const Session = mongoose.model<ISession>('Session', SessionSchema);

export default Session;
