import mongoose from "mongoose";

// set schema
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  price: {
    type: Number,
    min: 0, //? for type number use min/max
    required: true,
  },
});

// create collection
const Food = mongoose.model("Food", foodSchema);

export default Food;
