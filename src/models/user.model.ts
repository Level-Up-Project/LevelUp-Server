import { Document, Schema, model, Model, Types } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  email: string;
  phone: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
