import Item from "../models/item.js";
import List from "../models/list.js";
import mongoose from "mongoose";

const createList = async (req, res) => {
  try {
    const list = await List.create(req.body);
    res.status(201).json(list);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const getLists = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const skip = (page - 1) * limit;
    const lists = await List.find().skip(skip).limit(limit);
    const totalLists = await List.countDocuments();

    res.status(200).json({ lists, totalLists, page, limit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching items" });
  }
};

const getList = async (req, res) => {
  try {
    const listId = await req.params.id;
    const list = await List.findById(listId);
    res.status(200).json(list);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid list ID" });
    } else {
      console.error(error);
      return res.status(500).json({ error: "An error occurred" });
    }
  }
};

const updateList = async (req, res) => {
  try {
    const listId = await req.params.id;
    const updateList = await req.body;
    const updatedList = await List.findByIdAndUpdate(listId, updateList, {
      new: true,
    });
    if (updatedList) {
      res.status(200).json(updatedList);
    } else {
      res.status(404).json({ message: "List not found" });
    }
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid list ID" });
    } else {
      return res.status(500).json({ error: "An error occurred" });
    }
  }
};

const deleteList = async (req, res) => {
  try {
    const listId = await req.params.id;
    const deletedList = await List.deleteOne({ _id: listId });
    if (deletedList.deletedCount === 1) {
      res.status(200).json({
        message: "List deleted successfully",
      });
    } else {
      res.status(404).json({ message: "List not found" });
    }
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid list ID" });
    } else {
      return res.status(500).json({ error: "An error occurred" });
    }
  }
};

const addItemToList = async (req, res) => {
  try {
    const list = await List.findById(req.params.listId);

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    const item = await Item.findById(req.body.itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (
      list.items.some(
        (existingItem) =>
          existingItem._id.toString() === req.body.itemId.toString()
      )
    ) {
      return res
        .status(409)
        .json({ message: "Item already exists in the list" });
    }

    await list.updateOne({ $push: { items: item } });
    res.status(200).json({ message: "Item added successfully to the list" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid list ID" });
    } else {
      return res
        .status(500)
        .json({ error: "An error occurred while adding the item" });
    }
  }
};

const removeItemFromList = async (req, res) => {
  try {
    const listId = req.params.listId;
    const itemId = req.params.id;
    const updatedList = await List.findByIdAndUpdate(
      listId,
      {
        $pull: { items: { _id: itemId } },
      },
      { new: true }
    );

    if (!updatedList) {
      return res.status(404).json({ message: "List or item not found" });
    }

    res.status(200).json({ message: "Item removed from list succesfully" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid list ID" });
    } else {
      return res
        .status(500)
        .json({ error: "An error occurred while removing the item" });
    }
  }
};

export default {
  createList,
  getList,
  getLists,
  updateList,
  deleteList,
  addItemToList,
  removeItemFromList
};
