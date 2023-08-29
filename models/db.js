const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => console.log("Connected to DB!"))
  .on("error", (err) => console.log("Error with DB!", err));
