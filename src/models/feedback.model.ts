import mongoose, { Document, Schema } from 'mongoose';

// Defining the interface for the Feedback document
export interface IFeedback extends Document {
  userId: mongoose.Types.ObjectId;
  title: String,
  rating: number;
  comment: string;
  createdAt: Date;
}

// Define the schema for the Feedback model
const FeedbackSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Creating the Feedback model with proper type
const Feedback = mongoose.model<IFeedback>('Feedback', FeedbackSchema);

export default Feedback;
