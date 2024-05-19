const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Customer Schema
const customerSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
  lastLoginDate: { type: Date }
});

const Customer = mongoose.model('Customer', customerSchema);

// Product Schema
const productSchema = new Schema({
  name: { type: String, required: true },
  shortDescription: { type: String, required: true },
  price: { type: Number, required: true },
  categoryID: { type: Schema.Types.ObjectId, ref: 'Collection' },
  brandID: { type: Schema.Types.ObjectId, ref: 'Brand' },
  stockQuantity: { type: Number, required: true },
  SKU: { type: String, required: true },
  sizeML: { type: Number },
  imageURL: { type: String },
  benefits: { type: String },
  targets: { type: String },
  for: { type: String },
  dermologicallyTested: { type: Boolean },
  ingredients: { type: String },
  instructions: { type: String }
});

const Product = mongoose.model('Product', productSchema);

// Collection Schema
const collectionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  parentCategoryID: { type: Schema.Types.ObjectId, ref: 'Collection' }
});

const Collection = mongoose.model('Collection', collectionSchema);

// Brand Schema
const brandSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  logoURL: { type: String }
});

const Brand = mongoose.model('Brand', brandSchema);

// Order Schema
const orderSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'Customer' },
  orderDate: { type: Date, default: Date.now },
  totalPrice: { type: Number, required: true },
  shippingAddress: { type: String, required: true },
  billingAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  orderStatus: { type: String, required: true }
});

const Order = mongoose.model('Order', orderSchema);

// OrderDetail Schema
const orderDetailSchema = new Schema({
  orderID: { type: Schema.Types.ObjectId, ref: 'Order' },
  productID: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  discountApplied: { type: Number },
  subtotal: { type: Number, required: true }
});

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

// Payment Schema
const paymentSchema = new Schema({
  orderID: { type: Schema.Types.ObjectId, ref: 'Order' },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  transactionID: { type: String, required: true }
});

const Payment = mongoose.model('Payment', paymentSchema);

// Cart Schema
const cartSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'Customer' },
  productID: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', cartSchema);

// Review Schema
const reviewSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'Customer' },
  productID: { type: Schema.Types.ObjectId, ref: 'Product' },
  rating: { type: Number, required: true },
  comment: { type: String },
  reviewDate: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

// Shipping Schema
const shippingSchema = new Schema({
  orderID: { type: Schema.Types.ObjectId, ref: 'Order' },
  shippingDate: { type: Date },
  deliveryDate: { type: Date },
  carrier: { type: String },
  trackingNumber: { type: String },
  shippingCost: { type: Number }
});

const Shipping = mongoose.model('Shipping', shippingSchema);

// Discount Schema
const discountSchema = new Schema({
  code: { type: String, required: true },
  discountType: { type: String, required: true },
  discountAmount: { type: Number, required: true },
  validFrom: { type: Date, required: true },
  validTo: { type: Date, required: true }
});

const Discount = mongoose.model('Discount', discountSchema);

// Promotion Schema
const promotionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  discountID: { type: Schema.Types.ObjectId, ref: 'Discount' },
  promotionType: { type: String, required: true },
  validFrom: { type: Date, required: true },
  validTo: { type: Date, required: true }
});

const Promotion = mongoose.model('Promotion', promotionSchema);

// Return Schema
const returnSchema = new Schema({
  orderID: { type: Schema.Types.ObjectId, ref: 'Order' },
  returnDate: { type: Date, default: Date.now },
  reason: { type: String },
  status: { type: String },
  refundAmount: { type: Number }
});

const Return = mongoose.model('Return', returnSchema);

// Transaction Schema
const transactionSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'Customer' },
  amount: { type: Number, required: true },
  transactionDate: { type: Date, default: Date.now },
  transactionType: { type: String, required: true }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Inventory Schema
const inventorySchema = new Schema({
  productID: { type: Schema.Types.ObjectId, ref: 'Product' },
  warehouseID: { type: Schema.Types.ObjectId, ref: 'Warehouse' },
  quantityInStock: { type: Number, required: true }
});

const Inventory = mongoose.model('Inventory', inventorySchema);

// Warehouse Schema
const warehouseSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  contactInfo: { type: String }
});

const Warehouse = mongoose.model('Warehouse', warehouseSchema);

// SalesTax Schema
const salesTaxSchema = new Schema({
  stateName: { type: String, required: true },
  rate: { type: Number, required: true }
});

const SalesTax = mongoose.model('SalesTax', salesTaxSchema);

// Address Schema
const addressSchema = new Schema({
  customerID: { type: Schema.Types.ObjectId, ref: 'Customer' },
  addressLine1: { type: String },
  addressLine2: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  postalCode: { type: String },
  type: { type: String, enum: ['billing', 'shipping'] }
});

const Address = mongoose.model('Address', addressSchema);

// DoctorTestimonial Schema
const doctorTestimonialSchema = new Schema({
  doctorName: { type: String, required: true },
  comment: { type: String, required: true },
  testimonialDate: { type: Date, default: Date.now }
});

const DoctorTestimonial = mongoose.model('DoctorTestimonial', doctorTestimonialSchema);

// User Schema
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  userType: { type: String, required: true },
  userRole: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Role Schema
const roleSchema = new Schema({
  roleName: { type: String, required: true },
  roleFeatures: { type: [String], required: true }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = {
  Customer,
  Product,
  Collection,
  Brand,
  Order,
  OrderDetail,
  Payment,
  Cart,
  Review,
  Shipping,
  Discount,
  Promotion,
  Return,
  Transaction,
  Inventory,
  Warehouse,
  SalesTax,
  Address,
  DoctorTestimonial,
  User