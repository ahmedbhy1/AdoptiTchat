import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    role: Number,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cat' }],
    requestedForAdoption: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cat' }],
    adopted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cat' }]
  });

export const User = mongoose.model('User', userSchema);