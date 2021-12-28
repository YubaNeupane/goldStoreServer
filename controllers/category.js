import CategoryModal from "../models/Category.js";

import mongoose from "mongoose";

export const getCategoryies = async (req, res) => {
  try {
    const categories = await CategoryModal.find().sort({ _id: -1 });

    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  const category = req.body;

  const newCategory = new CategoryModal({
    ...category,
    createdAt: new Date().toISOString(),
  });

  try {
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { title, thumbNail } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Category with id: ${id}`);

  let updatedCategory = { title, thumbNail, _id: id };

  updatedCategory = await CategoryModal.findByIdAndUpdate(id, updatedCategory, {
    new: true,
  });

  res.json(updatedCategory);
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await CategoryModal.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};
