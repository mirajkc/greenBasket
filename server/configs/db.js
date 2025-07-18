//connsecting to the db


import mongoose from 'mongoose';

const connectDB = async() =>{
 // 1. mongoose.connection.on("connected", ...) sets up an event listener
//    This prepares your app to respond when Mongoose emits the "connected" event

// 2. await mongoose.connect(...) sends a connection request to MongoDB server

// 3. MongoDB server accepts the connection if everything is okay

// 4. Mongoose (inside your app) detects the successful connection

// 5. Mongoose emits the "connected" event 

// 6. The event listener (mongoose.connection.on) you registered earlier catches this event

// 7. Your callback function runs, e.g., logging "Database Connected"


  try {
    mongoose.connection.on("connected", ()=>console.log("Database Connected"));
    await mongoose.connect(`${process.env.MONGODB_URI}/greenBasket`)
  } catch (error) {
    console.error(error.message)
  }
}
export default connectDB;