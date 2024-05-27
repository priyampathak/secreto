import mongoose from "mongoose";

// Define the schema
const { Schema } = mongoose;

// Define the size subdocument schema
const SizeSchema = new Schema({
  size: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true }
});


// Define the product schema
const ProductSchema = new Schema({
  name: { type: String, required: true },
  short_description: { type: String },
  benefits:{ type: String },
  category_id: { type: Schema.Types.ObjectId, ref: 'categories', required: true },
  targets: { type: String },
  for: { type: String },
  dermologically_tested : { type: String },
  ingredients : { type: String },
  instructions : { type: String },
  min_cost : { type: Number },
  img_main: { type: String },
  img_2: { type: String },
  img_3: { type: String },
  img_4: { type: String },
  sizes: [SizeSchema],
  type: { type: String }
});

// Define or retrieve the model with autoCreate option
export const Product = mongoose.models.products || mongoose.model("products", ProductSchema, "products", { autoCreate: true });
