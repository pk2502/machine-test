const express = require("express");
const router = express.Router();
const Employees = require("../models/Employees");
const multer = require("multer");
router.get("/", async (req, res) => {
  try {
    const employees = await Employees.find({});
    res.send({ employees });
  } catch (error) {
    res.status(400).send({ error: err });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employees.findById(req.params.id);
    res.send({ employee });
  } catch (error) {
    res.status(400).send({ error: err });
  }
});
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "." + file.mimetype.split("/")[1]);
  },
});
const upload = multer({ storage });
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const newEmployee = await Employees.create({
      ...req.body,
      photo: req.file ? req.file.path : null,
    });
    res.send({ newEmployee });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employees.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send({ updatedEmployee });
  } catch (error) {
    res.status(400).send({ error: err });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Employees.findByIdAndRemove(req.params.id);
    res.send({ message: "The employee was removed." });
  } catch (error) {
    res.status(400).send({ error: err });
  }
});
module.exports = router;
