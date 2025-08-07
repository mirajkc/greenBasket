// importing modules
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCLoudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebHooks } from './controllers/orderController.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to the database and Cloudinary
await connectDB();
await connectCLoudinary();

// ✅ Define allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://green-basket-egji.vercel.app',
  'https://green-basket-egji-89pc1jn93-miraj-kcs-projects.vercel.app'
];

// ✅ Set up CORS middleware before everything else
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
};

app.use(cors(corsOptions)); 


app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebHooks);


app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.send("Hello World");
});

// user routes
app.use('/api/user', userRouter);

// seller routes
app.use('/api/seller', sellerRouter);

// product routes
app.use('/api/product', productRouter);

// cart routes
app.use('/api/cart', cartRouter);

// address routes
app.use('/api/address', addressRouter);

// order routes
app.use('/api/order', orderRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
