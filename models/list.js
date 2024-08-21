import mongoose from "mongoose";
import Item from "./item.js";

const listSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 3 },
  items: [Item.schema],
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model("List", listSchema);
