import mongoose from "mongoose";

// Define the schema
const { Schema } = mongoose;

// Define the category schema
const CategorySchema = new Schema({
  category_name: { type: String, required: true },
  description: { type: String,  }
});

// Define or retrieve the model with autoCreate option
export const Category = mongoose.models.categories || mongoose.model("categories", CategorySchema, "categories", { autoCreate: true });

