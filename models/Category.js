import mongoose from "mongoose";

const catSchema = mongoose.Schema({
  id: { type: String },
  title: { type: String, required: true },
  thumbNail: { type: String, required: true },
  createdAt: String,
});

export default mongoose.model("Category", catSchema);
