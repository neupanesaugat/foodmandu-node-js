import mongoose from "mongoose";

//? set schema
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String, //? js uses string and mongoose uses String(with capital S)
    required: true,
    maxlength: 55,
    trim: true,
    lowercase: true,
  },
  location: {
    type: String,
    required: true,
    maxlength: 55,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
    maxlength: 55,
    minlength: 10,
    trim: true,
  },
  ownerName: {
    type: String,
    nullable: true, //? accept null value
    default: null, //? if user don't enter any value , enter null in DB
  },
});

//? create collection
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
