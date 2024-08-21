import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 3 },
  quantity: { type: Number, required: true, min: 0 },
  notes: { type: String },
  category: { type: String },
  tags: [String],
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model("Item", itemSchema)