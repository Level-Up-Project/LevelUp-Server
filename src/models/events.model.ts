import mongoose, { Document, Schema } from 'mongoose';

// Defining the interface for the Event document
export interface IEvent extends Document {
  title: string;
  description: string;
  type: string; // Type of event (e.g., 'workshop', 'seminar', etc.)
  startTime: Date;
  endTime: Date;
  host: mongoose.Types.ObjectId; // Reference to the User model (host)
  joinee: mongoose.Types.ObjectId[]; // Array of User references (attendees)
  feedback: mongoose.Types.ObjectId; // Reference to Feedback model
  certificate: string; // URL or path to the certificate (if applicable)
}

// Define the schema for the Event model
const EventSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true }, // e.g., 'workshop', 'seminar'
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    joinee: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    feedback: { type: mongoose.Schema.Types.ObjectId, ref: 'Feedback', required: true },
    certificate: { type: String, default: '' } // URL or path to the certificate
  },
  { timestamps: true }
);

// Creating the Event model with proper type
const Event = mongoose.model<IEvent>('Event', EventSchema);

export default Event;
