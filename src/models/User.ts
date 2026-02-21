import mongoose, { Schema } from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true, // 🔥 REQUIRED
      select: false,  // 🔐 important
    },
    image: String,
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>('User', UserSchema);