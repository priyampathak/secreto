import mongoose from "mongoose";

// Define the schema
const { Schema } = mongoose;

// Define the order schema
const OrderSchema = new Schema({
  products: [
    {
      productId: { type: String },
      size: { type: String },
      quantity: { type: Number },
      price: { type: Number },
    }
  ],
  formData: {
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    email: { type: String },
    city: { type: String },
    house: { type: String },
    landmark: { type: String },
    zip: { type: String }
  },
  paymentStatus: { type: String },
  subTotal: { type: Number},
  card: { type: String },
  order_status: { type: String },
  order_date: { type: String },
});

// Define or retrieve the model with autoCreate option
export const Order = mongoose.models.orders || mongoose.model("orders", OrderSchema);
