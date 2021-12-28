import express from "express";

const router = express.Router();

import auth from "../middleware/auth.js";

import {
  getCategoryies,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.js";

router.get("/", getCategoryies);
router.post("/", auth, createCategory);
router.patch("/:id", auth, updateCategory);
router.delete("/:id", auth, deleteCategory);

export default router;
