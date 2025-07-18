import mongoose from "mongoose";

// Create schema for Address
const addressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: true },  // kept as string to handle leading 0s
  country: { type: String, required: true },
  phone: { type: String, required: true }
}, {
  minimize: false  // Prevent Mongoose from removing empty objects
});

// Reuse existing model if already compiled
const Address = mongoose.models.Address || mongoose.model('Address', addressSchema);

export default Address;
