import express from "express";
import {
  addFoodItem,
  deleteFoodById,
  editFoodById,
  getFoodDetailById,
  getFoodList,
  validateFoodDetails,
  validateFoodId,
  validateMongoId,
} from "./food.service.js";

const router = express.Router();

//* add food items
router.post("/add", validateFoodDetails, addFoodItem);

//* get all food items
router.get("/list", getFoodList);

//* get product detail by id
router.get("/list/:id", validateMongoId, validateFoodId, getFoodDetailById);

//* delete food item by id
router.delete("/delete/:id", validateMongoId, validateFoodId, deleteFoodById);

//* edit food item by id
router.put("/edit/:id", validateMongoId, validateFoodId, editFoodById);

export default router;
