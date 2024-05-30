import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the schema
const UserModelSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String},
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  user_type: { type: Number, required: true, default: 1 },
  email_status: { type: String},
  mobile: { type: String},
  mobile_status: { type: String },
  user_status: { type: Number},
  member_since: { type: String },
  country: { type: String },
  city : { type: String },
  zip : { type: Number },
  house_number: { type: String },
  street_name: { type: String },
  // Add more properties as needed
});

// Define or retrieve the model with autoCreate option
export const User = mongoose.models.users || mongoose.model("users", UserModelSchema, "users", { autoCreate: true });
