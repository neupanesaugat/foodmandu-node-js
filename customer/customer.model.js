import mongoose from "mongoose";

//? set rule/schema/structure

const customerSchema = new mongoose.Schema({
  //? new helps to create object (following mongoose documentation)
  email: String,
  phoneNumber: String,
  address: String,
});

//? create table/model/collection

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
