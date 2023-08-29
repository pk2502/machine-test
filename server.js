const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./config.env") });
require("./models/db");
const app = express();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("cors")());
app.use(require("helmet")());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/api/employees", require("./routes/employees"));
app.listen(PORT, () => console.log(`App running on port ${PORT}`));