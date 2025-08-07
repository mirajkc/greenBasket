// importing modules
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCLoudinary from './configs/cloudinary.js'
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebHooks } from './controllers/orderController.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to the database
await connectDB();
await connectCLoudinary();

// Allow multiple origins
const allowedOrigins = ['http://localhost:5173','https://green-basket-egji.vercel.app'];
app.post('/stripe',express.raw({type : 'application/json'}), stripeWebHooks)

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Routes
app.get('/', (req, res) => {
  res.send("Hello World");
});


//user Routes
app.use('/api/user', userRouter);

//seller Routes
app.use('/api/seller', sellerRouter)

//product router
app.use('/api/product', productRouter)

//update cart
app.use('/api/cart', cartRouter)

//adress
app.use('/api/address', addressRouter)

//order 
app.use('/api/order', orderRouter)


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
