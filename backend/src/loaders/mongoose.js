import mongoose from 'mongoose';
import { dbUri } from '../config/index.js';

export default async () => {
  try {
    await mongoose.connect(dbUri, {});
    console.log('Connected to mongodb successfully!');
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}