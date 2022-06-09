//declare the express router object for the contact-us route and export it for use in server.js
const express = require("express");
router = express.Router();

const { requireLogin } = require("../middlware/auth-middlware");
const {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getPropertiesPagination,
  propertyImage,
  myProperties,
  searchProperty
} = require("../controllers/property");

router.post("/createProperty", requireLogin, createProperty);
router.get("/getAllProperties", getAllProperties);
router.get("/searchProperty", searchProperty);
router.get("/getPropertyPagination", getPropertiesPagination);
router.get("/myProperties", requireLogin , myProperties)
router.get("/getPropertyById/:id", getPropertyById);
router.put("/updateProperty/:id", requireLogin, updateProperty);
router.delete("/deleteProperty/:id", requireLogin, deleteProperty);
//get image
router.get("/property/image/:id",propertyImage)

//export the router object for use in server.js
module.exports = router;
