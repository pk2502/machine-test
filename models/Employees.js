const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  email: { type: String, required: true, trim: true },
  dob: { type: Date },
  address: { type: String },
  photo: { type: String },
});
module.exports = mongoose.model("employees", employeeSchema);
