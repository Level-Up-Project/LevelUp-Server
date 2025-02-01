import mongoose, { Document, Schema } from 'mongoose';

// Defining the interface for the Comment document
export interface IComment extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the User who made the comment
  description: string; // The content of the comment
  likes: number; // Number of likes the comment has received
  replies: mongoose.Types.ObjectId[]; // Array of Comment references (replies to this comment)
  createdAt: Date; // Timestamp of when the comment was created
  updatedAt: Date; // Timestamp of when the comment was last updated
}

// Define the schema for the Comment model
const CommentSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    likes: { type: Number, default: 0 },
    replies: { type: [mongoose.Schema.Types.ObjectId], ref: 'Comment', default: [] },
  },
  { timestamps: true }
);

// Creating the Comment model with proper type
const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;
