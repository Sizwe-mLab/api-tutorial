import Item from "../models/item.js";

const createItem = async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the item" });
  }
};

const getItems = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const items = await Item.find().skip(skip).limit(limit);

    const totalItems = await Item.countDocuments();

    res.status(200).json({ items, totalItems, page, limit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occuered while fetching iems" });
  }
};

const getItem = async (req, res) => {
  try {
    const itemId = await req.params.id;
    const item = await Item.findById(itemId);
    res.status(200).json(item);
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(400).json({ error: "Invalid item Id" });
    } else {
      res.status(500).json({ error: "An error occured" });
    }
  }
};

const updateItem = async (req, res) => {
  try {
    const itemId = await req.params.id;
    const updateItem = await req.body;
    const updatedItem = await Item.findByIdAndUpdate(itemId, updateItem, {
      new: true,
    });
    res.status(200).json(updatedItem);
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(400).json({ error: "Invalid item Id" });
    } else {
      res.status(500).json({ error: "An error occured" });
    }
  }
};

const deleteItem = async (req, res) => {
  try {
    const itemId = await req.params.id;
    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (deletedItem) {
      res.status(200).json({ message: "Item deleted Successfully" });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(400).json({ error: "Invalid item Id" });
    } else {
      res.status(500).json({ error: "An error occured" });
    }
  }
};

export default {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem
};
