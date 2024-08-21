import express from "express";
import itemController from "../controllers/itemController.js";
import listController from "../controllers/listController.js";

const router = express.Router();

router.post("/items", itemController.createItem);
router.get("/items", itemController.getItems);
router.get("/items/:id", itemController.getItem);
router.put("/items/:id", itemController.updateItem);
router.delete("/items/:id", itemController.deleteItem);

router.post("/lists", listController.createList);
router.get("/lists", listController.getLists);
router.get("/lists/:id", listController.getList);
router.put("/lists/:id", listController.updateList);
router.delete("/lists/:id", listController.deleteList);
router.post("/lists/:listId/items/:id", listController.addItemToList);
router.delete("/lists/:listId/items/:id", listController.removeItemFromList);

export default router;
