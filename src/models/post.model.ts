import mongoose, { Document, Schema } from 'mongoose';

// Defining the interface for the Post document
export interface IPost extends Document {
  title: string;
  description: string;
  hashtags: string[]; // Array of hashtags related to the post
  medias: string[]; // Array of media URLs (e.g., images, videos)
  tagged: mongoose.Types.ObjectId[]; // Array of User references (users tagged in the post)
  likes: number; // Number of likes the post has received
  comments: mongoose.Types.ObjectId[]; // Array of Comment references
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the Post model
const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    hashtags: { type: [String], default: [] }, // Array of hashtags related to the post
    medias: { type: [String], default: [] }, // Array of media URLs (images, videos)
    tagged: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] }, // Array of User references for tagged users
    likes: { type: Number, default: 0 }, // Number of likes for the post
    comments: { type: [mongoose.Schema.Types.ObjectId], ref: 'Comment', default: [] }, // Array of Comment references
  },
  { timestamps: true }
);

// Creating the Post model with proper type
const Post = mongoose.model<IPost>('Post', PostSchema);

export default Post;
