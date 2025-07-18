import mongoose from "mongoose";

// Create schema for User
const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartItems:{ type: Object, default: {} }
}, {
  minimize: false  // Prevent Mongoose from removing empty objects
});

// Reuse existing model if already compiled
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
