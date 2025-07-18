import express from 'express';
const app = express();
app.use(express.json());

import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/product.js'; // 
// Add Product: /api/product/add
export const addProduct = async (req, res) => {
  try {
    // Destructure fields from req.body
    const { name, category, price, offerPrice, description } = req.body;

    // Basic validation (optional but recommended)
    if (!name || !category || !price || !offerPrice || !description) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Parse description string back to array (sent as JSON string)
    const descriptionArray = JSON.parse(description);

    // Upload images to Cloudinary
    const imagesUrl = await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: 'image',
        });
        return result.secure_url;
      })
    );

    // Create product in DB
    const newProduct = await Product.create({
      name,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice),
      description: descriptionArray,
      image: imagesUrl,
    });

    res.json({ success: true, message: 'Product Added', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Products: /api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      success: true,
      products,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message }); 
  }
};

// Get single product: /api/product/id
export const productByID = async (req, res) => {
  try {
    const { id } = req.body;

    const product = await Product.findById(id); 

    res.json({
      success: true,
      product,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message }); 
  }
};

// Change product stock: /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });

    res.json({
      success: true,
      message: "Stock Changed",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message }); 
  }
};
