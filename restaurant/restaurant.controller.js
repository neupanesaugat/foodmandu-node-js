import express from "express";
import Restaurant from "./restaurant.model.js";
import Yup from "yup";
import mongoose from "mongoose";

const router = express.Router();

//? add restaurant
router.post(
  "/add",
  async (req, res, next) => {
    const restaurantValidationSchema = Yup.object({
      //? firstly validate the data using yup
      name: Yup.string("Name should be a string.")
        .required("Name must be entered.")
        .trim()
        .max(55)
        .lowercase(),
      contact: Yup.string().required().trim().max(55),
      location: Yup.string().trim().required().max(55),
      ownerName: Yup.string().max(55).default(null).nullable(),
    });
    try {
      const validatedData = await restaurantValidationSchema.validate(req.body); //? validated data will pass in the req.body
      req.body = validatedData;
    } catch (error) {
      return res.status(400).send({ message: error.message }); //? if the data is not validated or don't satisfy the condition, it can be directly returned from server without pushing it to the database
    }
    next(); //? (middleware) calls the next function after this function (if all the conditions are satisfied, then next() function is called and the data is pushed to database)
  },

  async (req, res) => {
    //? extract new values from req.body
    const newRestaurant = req.body;

    //? insert into db
    await Restaurant.create(newRestaurant);
    return res
      .status(201)
      .send({ message: "Restaurant is added successfully" });
  }
);

//? delete a restaurant
router.delete(
  "/delete/:id",
  //? check valid id in this function
  (req, res, next) => {
    // extract restaurant id from req.params
    const id = req.params.id;

    // check for mongo id validity
    const isValidId = mongoose.isValidObjectId(id);

    // if not valid mongo id,throw error
    if (!isValidId) {
      return res.status(400).send({ message: "Invalid mongo id." });
    }
    next();
  },
  //? delete restaurant in this function
  async (req, res) => {
    // extract restaurant id from req.params
    const restaurantId = req.params.id;

    // find restaurant
    const requiredRestaurant = await Restaurant.findById(restaurantId);

    // if not restaurant, throw error
    if (!requiredRestaurant) {
      return res.status(404).send({ message: "Restaurant does not exist" });
    }

    // delete restaurant
    await Restaurant.findByIdAndDelete(restaurantId);
    return res
      .status(200)
      .send({ message: "Restaurant is deleted successfully" });
  }
);

export default router;
