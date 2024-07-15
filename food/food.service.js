import Yup from "yup";
import Food from "./food.model.js";
import mongoose from "mongoose";

//? Validate Food Details
export const validateFoodDetails = async (req, res, next) => {
  const data = req.body;

  const addFoodSchema = Yup.object({
    name: Yup.string("Name must be a string")
      .required("Name field is required")
      .trim()
      .max(50, "Name should not be more than 50 characters"),
    price: Yup.number("Price must be a number")
      .required()
      .min(0, "Price cannot be a negative value"),
  });
  try {
    const validatedData = await addFoodSchema.validate(data);
    req.body = validatedData;
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  next();
};

//? Adding Food Items
export const addFoodItem = async (req, res) => {
  // extract new data from req.body
  const newFoodItem = req.body;

  //
  await Food.create(newFoodItem);
  return res.status(200).send({ message: "Food has been added successfully" });
};

//? Get list of all the foods
export const getFoodList = async (req, res) => {
  const foodItems = await Food.find();

  return res.status(200).send({ message: "Success", foodItems }); //? foodItems only defines foodItems is the name of both key and value
};

//? Check Validity of MongoID
export const validateMongoId = (req, res, next) => {
  // extract id from req.params
  const id = req.params.id;
  // check for mongo id validity
  const isValidId = mongoose.isValidObjectId(id);

  // if not valid, throw error
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid mongoID" });
  }

  // call next function
  next();
};

//? Check Validity of FoodId
export const validateFoodId = async (req, res, next) => {
  // extract id from req.params
  const id = req.params.id;

  // find the food from the id
  const requiredFoodItem = await Food.findById(id);
  // if not customer throw error
  if (!requiredFoodItem) {
    return res.status(404).send({ message: "Food not found!" });
  }
  req.foodItem = requiredFoodItem; //? req is as object, show adding requiredFoodItem details inside req object
  next();
};

//? Get list of Food by id
export const getFoodDetailById = async (req, res) => {
  return res
    .status(200)
    .send({ message: "Success...", foodItem: req.foodItem });
};

//? Delete the food details by id
export const deleteFoodById = async (req, res) => {
  // extract id from req.params
  const foodId = req.params.id;

  // delete food item
  await Food.findByIdAndDelete(foodId);

  // send res
  return res.status(200).send({ message: "Food Item deleted successfully!" });
};

export const editFoodById = async (req, res) => {
  // extract id from req.params
  const foodId = req.params.id;

  // take new values from req.body
  const newValues = req.body;

  // update the value
  const updatedFoodList = await Food.findByIdAndUpdate(foodId, {
    ...newValues,
  });

  // send res
  return res.status(200).send({ message: "Success...", updatedFoodList });
};
