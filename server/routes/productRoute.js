import express from 'express';
import { upload } from '../configs/multer.js';
import { addProduct, changeStock, productByID, productList } from '../controllers/ProductController.js';
import authSeller from '../middlewares/authSeller.js';

const productRouter = express.Router();


productRouter.post('/add', upload.array('images'), authSeller, addProduct);


productRouter.get('/id/:id', productByID);


productRouter.get('/list', productList);
productRouter.post('/stock', authSeller, changeStock);

export default productRouter;
