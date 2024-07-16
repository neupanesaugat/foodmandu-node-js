import mongoose from "mongoose";

// set schema
const orderSchema = mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true,
  },
  quantity: {
    type: Number,
    min: 0,
    required: true,
  },
});

//create collection (model)
const Order = mongoose.model("Order", orderSchema);

export default Order;
