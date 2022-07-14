const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const auth = require("./routes/auth");
const mongoose = require("mongoose");
const contactUs = require("./routes/contact-us");
const property = require("./routes/property");
const config = require("dotenv").config();
const path = require("path");
const {requireLogin} = require("./middlware/auth-middlware");
mongoose.Promise = global.Promise;
console.log(process.env.DEV_MONGO);
// Connect MongoDB at default port 27017.
if (process.env.NODE_ENV === "production") {
  DB = process.env.MONGO_URI;
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
app.use("/api/auth", auth);
app.use("/api", contactUs);
app.use("/api", property);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.use('/admin', express.static(path.join(__dirname, 'admin/build')))

  app.get('admin/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/admin/build/index.html'))
  })
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


/*
// when going to `/app2`, serve the files at app2/build/* as static files
app.use('/app2', express.static(path.join(__dirname, 'app2/build')))
// when going to `/`, serve the files at mainApp/build/* as static files
app.use(express.static(path.join(__dirname, 'mainApp/build')))


// These are necessary for routing within react
app.get('app2/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/app2/build/index.html'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/mainApp/build/index.html'));
});
*/
