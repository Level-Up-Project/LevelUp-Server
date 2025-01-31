import mongoose, { Document, Schema } from 'mongoose';

// Defining the interface for the Newsletter document
export interface INewsletter extends Document {
  title: string;
  description: string;
  category: string; // Category of the newsletter (e.g., 'Tech', 'Marketing', etc.)
  subscribers: mongoose.Types.ObjectId[]; // Array of User references (subscribers)
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the Newsletter model
const NewsletterSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subscribers: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] }, // Array of User references
  },
  { timestamps: true }
);

// Creating the Newsletter model with proper type
const Newsletter = mongoose.model<INewsletter>('Newsletter', NewsletterSchema);

export default Newsletter;
