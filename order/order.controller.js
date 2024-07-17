import express from "express";
import Order from "./order.model.js";

const router = express.Router();

//* add order
router.post("/add", async (req, res) => {
  const newOrder = req.body;
  await Order.create(newOrder);
  return res
    .status(200)
    .send({ message: "Order has been placed successfully" });
});

//* get customerEmail, foodName and quantity
router.get("/detail", async (req, res) => {
  const orderDetail = await Order.aggregate([
    {
      $match: {},
    },
    {
      $lookup: {
        from: "customers",
        localField: "customerId",
        foreignField: "_id",
        as: "customerDetails",
      },
    },
    {
      $lookup: {
        from: "foods",
        localField: "foodId",
        foreignField: "_id",
        as: "foodDetails",
      },
    },
    {
      $project: {
        customerEmail: { $first: "$customerDetails.email" },
        foodName: { $first: "$foodDetails.name" },
        quantity: 1,
      },
    },
  ]);
  return res.status(200).send({ message: "Success...", orderDetail });
});

export default router;
