import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const createdProduct = await Product.insertMany(data.products);
    res.send({ createdProduct });
  })
);

export default productRouter;
