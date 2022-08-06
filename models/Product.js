import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  weight: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  thumbNail: { type: String, required: true },
  images: { type: [String] },
  createdAt: String,
});

export default mongoose.model("Product", productSchema);
