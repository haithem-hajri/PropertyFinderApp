const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const auth = require("./routes/auth");
const mongoose = require("mongoose");
const contactUs = require("./routes/contact-us");
const property = require("./routes/property");
const config = require("dotenv").config();
mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
if (process.env.NODE_ENV === "production") {
  DB = process.env.PROD_MONGO;
} else {
  DB = process.env.DEV_MONGO;
}
const PORT = process.env.PORT || 5000;
mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
    // useCreateIndex: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);
//middlwares

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
//routes
app.use("/api", auth);
app.use("/api", contactUs);
app.use("/api", property);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
