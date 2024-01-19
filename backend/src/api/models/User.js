import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    role: Number,
  });

export const User = mongoose.model('User', userSchema);