import express from 'express';
import { sellerLogin, sellerLogout, isSellerAuth } from '../controllers/SellerController.js';
import authSeller from '../middlewares/authSeller.js';

const sellerRouter = express.Router();

// Login route
sellerRouter.post('/login', sellerLogin);

// Check if seller is authenticated
sellerRouter.get('/auth-seller', authSeller, isSellerAuth);

// Logout route
sellerRouter.get('/logout', authSeller, sellerLogout);

export default sellerRouter;
