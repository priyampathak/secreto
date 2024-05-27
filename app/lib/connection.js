// /app/lib/db.js
import mongoose from 'mongoose';
import { connectionSrt } from './db';

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(connectionSrt, {
    
  }).then(() => console.log("MongoDB connected")).catch(err => console.log(err));
};
