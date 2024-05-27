import mongoose from "mongoose";

// Define the schema
const UserModelSchema = new mongoose.Schema({
  name: String,
  // Add more properties as needed
});

// Define or retrieve the model with autoCreate option
export const User = mongoose.models.users || mongoose.model("users", UserModelSchema, "users", { autoCreate: true });
