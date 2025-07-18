import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: [String], required: true }, 
  price:       { type: Number, required: true },
  offerPrice:  { type: Number, required: true },
  image:       { type: [String], required: true }, 
  category:    { type: String, required: true },
  inStock:     { type: Boolean, default: true }
}, {
  timestamps: true // adds createdAt and updatedAt
});

// Reuse model if already defined
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
