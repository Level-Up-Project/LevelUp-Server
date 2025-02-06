import { required } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export enum sessionType {
  EC_CONNECT = 'Ec Connect',
  IA_CONNECT = 'IA Connect',
  LEADERSHIP_CONNECT = 'Leadership Connect',
  MENTOR_CONNECT = 'Mentor Connect',
}

interface IJoinee {
  userId: mongoose.Types.ObjectId;
  joinTime: Date;
  leaveTime?: Date;
}

interface IHost {
  userId: mongoose.Types.ObjectId;
  role: 'host' | 'co-host';
  joinTime: Date;
  leaveTime?: Date;
}

export interface ISession extends Document {
  title: string;
  description: string;
  type: sessionType;
  host: IHost[];
  joinee: IJoinee[];
  feedbacks: mongoose.Types.ObjectId[];
  sessionJoinLink: string;
  recordingSrc: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'approve' | 'cancel';
  isSolo: boolean;
}

const hostSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Host user id is required'],
  },
  role: {
    type: String,
    enum: ['host', 'co-host'],
    required: [true, 'Role is required'],
  },
  joinTime: {
    type: String,
    required: [true, 'Host join time is required'],
  },
  leaveTime: Date,
});

const joineeSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'userId is required'],
  },
  joinTime: {
    type: Date,
    required: [true, 'joinTime is required'],
  },
  leaveTime: Date,
});

const SessionSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },

    description: {
      type: String,
      required: [true, 'Description is required'],
    },

    type: {
      type: String,
      enum: Object.values(sessionType),
      required: [true, 'Type is required'],
    },

    host: [hostSchema],

    joinee: [joineeSchema],

    feedback: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'feedback',
      },
    ],

    sessionJoinLink: {
      type: String,
      required: [true, 'Session join link is required'],
    },

    recordingSrc: {
      type: String,
    },

    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
    },

    endTime: {
      type: Date,
      required: [true, 'End time is required'],
    },

    status: {
      type: String,
      enum: ['pending', 'approve', 'cancel'],
      required: [true, 'Session status is required'],
      default: 'pending',
    },

    isSolo: {
      type: Boolean,
      required: [true, 'isSolo field is required'],
    },
  },
  { timestamps: true },
);

const Session = mongoose.model<ISession>('Session', SessionSchema);
export default Session;
