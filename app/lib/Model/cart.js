import mongoose from 'mongoose';

const { Schema } = mongoose;

const CartItemSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: 'products', required: true },
  quantity: { type: Number, required: true }
});

const CartSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  items: [CartItemSchema]
});

export const Cart = mongoose.models.carts || mongoose.model('carts', CartSchema, 'carts', { autoCreate: true });
