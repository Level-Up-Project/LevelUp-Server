import mongoose, { Document, Schema } from 'mongoose';

// Defining the interface for the User document
export interface IUser extends Document {
  name: string;  // Full name of the user
  email: string;  // Email of the user
  password: string;  // Hashed password
  phone: string;  // Phone number of the user
  avatar: string;  // URL to the avatar image
  isActive: boolean;  // Whether the user account is active
  skills: string[];  // List of skills the user has
  role: string;  // Role of the user (e.g., 'admin', 'user', 'moderator')
  subRole: string;  // Sub-role (optional, e.g., 'developer', 'designer', etc.)
  bookedSessions: mongoose.Types.ObjectId[];  // Array of Session references (sessions booked by the user)
  preferences: mongoose.Types.ObjectId;  // Reference to the Preferences model
  notifications: mongoose.Types.ObjectId[];  // Array of Notification references
  posts: mongoose.Types.ObjectId[];  // Array of Post references (posts created by the user)
  likedPosts: mongoose.Types.ObjectId[];  // Array of liked Post references
  savedPosts: mongoose.Types.ObjectId[];  // Array of saved Post references
  commentsOnPosts: mongoose.Types.ObjectId[];  // Array of Comment references (comments made by the user)
  createdAt: Date;  // Timestamp when the user was created
  updatedAt: Date;  // Timestamp when the user was last updated
}

// Define the schema for the User model
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    avatar: { type: String, default: '' },  // URL to the avatar image
    isActive: { type: Boolean, default: true },  // Account is active by default
    skills: { type: [String], default: [] },  // List of skills the user has
    role: { type: String, required: true },  // Role (e.g., 'admin', 'user', 'moderator')
    subRole: { type: String, default: '' },  // Sub-role (e.g., 'developer', 'designer', etc.)
    bookedSessions: { type: [mongoose.Schema.Types.ObjectId], ref: 'Session', default: [] },  // Array of booked sessions
    preferences: { type: mongoose.Schema.Types.ObjectId, ref: 'Preferences', required: true },  // Reference to Preferences model
    notifications: { type: [mongoose.Schema.Types.ObjectId], ref: 'Notification', default: [] },  // Array of Notification references
    posts: { type: [mongoose.Schema.Types.ObjectId], ref: 'Post', default: [] },  // Array of Posts created by the user
    likedPosts: { type: [mongoose.Schema.Types.ObjectId], ref: 'Post', default: [] },  // Array of liked posts
    savedPosts: { type: [mongoose.Schema.Types.ObjectId], ref: 'Post', default: [] },  // Array of saved posts
    commentsOnPosts: { type: [mongoose.Schema.Types.ObjectId], ref: 'Comment', default: [] },  // Array of Comment references made by the user
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

// Creating the User model with proper type
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
