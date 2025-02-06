import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface locationSchema {
  city: string;
  state: string;
  country: string;
}

const locationSchema = new Schema({
  city: {
    type: String,
    default: null,
  },
  state: {
    type: String,
    default: null,
  },
  country: {
    type: String,
    default: null,
  },
});

interface preferenceSchema {
  theme: string;
  language: string;
}

const preferenceSchema = new Schema({
  theme: {
    type: String,
    default: null,
  },
  language: {
    type: String,
    default: null,
  },
});

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide your password'],
    },
    phoneNumber: [
      {
        type: Number,
        required: [true, 'Please provide your phone number'],
      },
    ],
    avatar: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'student', 'mentor', 'admin', 'superAdmin'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'verified', 'banned'],
    },
    location: locationSchema,
    preference: preferenceSchema,
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

UserSchema.pre<UserInterface>('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(user.password, salt);
  next();
});

UserSchema.methods.isPasswordCorrect = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

interface UserInterface {
  name: string;
  email: string;
  password: string;
  phoneNumber: number[];
  avatar: string;
  role: string;
  isActive: boolean;
  status: string;
  location: locationSchema;
  preference: preferenceSchema;
  refreshToken: string;
  isModified: (field: string) => boolean;
}

const User = mongoose.model<UserInterface>('User', UserSchema);

export default User;
