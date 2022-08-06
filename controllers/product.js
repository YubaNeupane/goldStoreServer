import ProductModal from "../models/Product.js";
import client from "../utils/RedisConfig.js";

import mongoose from "mongoose";

export const getProducts = async (req, res) => {

  let redisData = await client.get("products");

  if(redisData != null) {
    res.status(200).json(JSON.parse(redisData));
  }else{
    try {
      const products = await ProductModal.find().sort({ _id: -1 });
      await client.set('products', JSON.stringify(products));
      res.status(200).json(products);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

};

export const createProduct = async (req, res) => {
  const product = req.body;

  const newProduct = new ProductModal({
    ...product,
    createdAt: new Date().toISOString(),
  });

  try {
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }

  const products = await ProductModal.find().sort({ _id: -1 });
      await client.set('products', JSON.stringify(products));
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, thumbNail, images, description, category, weight, price } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Product with id: ${id}`);

  let updatedProduct = {
    name,
    thumbNail,
    description,
    category,
    weight,
    price,
    images,
    _id: id,
  };

  updatedProduct = await ProductModal.findByIdAndUpdate(id, updatedProduct, {
    new: true,
  });

  const products = await ProductModal.find().sort({ _id: -1 });
  await client.set('products', JSON.stringify(products));

  res.json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No product with id: ${id}`);

  await ProductModal.findByIdAndRemove(id);

  const products = await ProductModal.find().sort({ _id: -1 });
  await client.set('products', JSON.stringify(products));

  res.json({ message: "Product deleted successfully." });
};
