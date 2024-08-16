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

export default createItem

