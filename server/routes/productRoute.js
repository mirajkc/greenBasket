import express from 'express';
import { upload } from '../configs/multer.js';
import { addProduct, changeStock, productByID, productList } from '../controllers/ProductController.js';
import authSeller from '../middlewares/authSeller.js';

const productRouter = express.Router();

// ✅ Fix 1: Corrected upload.array() usage
productRouter.post('/add', upload.array('images'), authSeller, addProduct);

// ✅ Fix 2: Changed GET /id to use route param
productRouter.get('/id/:id', productByID);

// ✅ Keep list and stock as-is
productRouter.get('/list', productList);
productRouter.post('/stock', authSeller, changeStock);

export default productRouter;
