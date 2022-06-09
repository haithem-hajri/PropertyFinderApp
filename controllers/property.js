//declare the express router  and property model
const express = require("express");
router = express.Router();
const Property = require("../models/Property");
const User = require("../models/User");
const { requireLogin } = require("../middlware/auth-middlware");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const mongoosePaginate = require("mongoose-paginate-v2");

exports.getAllProperties = (req, res) => {
  const { category, type, city } = req.query;
  let query = {};
  if (category) {
    query.category = { $in: category.split(",") };
  }
  if (type) {
    query.type = { $in: type.split(",") };
  }
  if (city) {
    query.city = { $in: city.split(",") };
  }
  // get all properties with filter
  Property.find(query)
    .select("-image")
    .populate("propertyUser", "name")
    .then((properties) => {
      res.status(200).json({
        properties,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.getPropertiesPagination = (req, res) => {
  const { page, category, type, city } = req.query;
  let query = {};
  if (category) {
    query.category = { $in: category.split(",") };
  }
  if (type) {
    query.type = { $in: type.split(",") };
  }
  if (city) {
    query.city = { $in: city.split(",") };
  }
  const options = {
    page: page,
    limit: 5,
  };
  Property.paginate(query, options, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
    res.json(result);
  });
};

// search property function
exports.searchProperty = (req, res) => {
  const search = req.query.search;
  const regex = new RegExp(search, "i");
  Property.find({
    $or: [{ title: regex }, { description: regex }, { city: regex }],
  })
    .select("-image")
    .populate("propertyUser", "name")
    .then((properties) => {
      res.json(properties);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.getPropertyById = (req, res) => {
  const id = req.params.id;
  Property.findById(id)
    .then((property) => {
      res.json(property);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
exports.myProperties = (req, res) => {
  Property.find({ propertyUser: req.user.id })
    .select("-image")
    .then((property) => {
      res.json(property);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.updateProperty = (req, res) => {
  const id = req.params.id;
  const {
    propertyName,
    propertyType,
    propertyPrice,
    propertyLocation,
    propertyDescription,
    propertyImage,
    propertyBedrooms,
    propertyBathrooms,
    propertyGarage,
    propertyArea,
    propertyStatus,
  } = req.body;
  Property.findByIdAndUpdate(id, {
    propertyName,
    propertyType,
    propertyPrice,
    propertyLocation,
    propertyDescription,
    propertyImage,
    propertyBedrooms,
    propertyBathrooms,
    propertyGarage,
    propertyArea,
    propertyStatus,
  })
    .then((property) => {
      res.json({
        success: true,
        message: "Property updated successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
exports.deleteProperty = (req, res) => {
  const id = req.params.id;
  Property.findByIdAndDelete(id)
    .then((property) => {
      res.json({
        success: true,
        message: "Property deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
// create property  formidable formdata
exports.createProperty = (req, res) => {
  const form = new formidable.IncomingForm();
  const uploadFolder = path.join(__dirname, "../public", "files");
  form.multiples = true;
  form.keepExtensions = true;
  form.uploadDir = uploadFolder;
  form.parse(req, (err, fields, files) => {
    //console.log("files: ", files);
    if (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    } else {
      const {
        title,
        price,
        type,
        availability,
        category,
        city,
        lat,
        lng,
        nbrChambre,
        description,
        nbrSalle,
      } = fields;

      let property = new Property();
      property.lat = lat;
      property.lng = lng;
      property.type = type;
      property.title = title;
      property.availability = availability;
      property.city = city;
      property.category = category;
      property.price = price;
      property.nbrSalle = nbrSalle;
      property.nbrChambre = nbrChambre;
      property.description = description;
      property.propertyUser = req.user.id;
      // if files.image add image to property
      //image
      if (files.image) {
        if (files.image.size > 10000000) {
          return res.status(400).json({
            error: "Image should be less then 1mb in size",
          });
        }
        property.image.data = fs.readFileSync(files.image.filepath);
        property.image.contentType = files.image.mimetype;
      } else {
        return res.status(400).json({ error: "upload image" });
      }

      property
        .save()
        .then(() => {
          res.json({
            success: true,
            message: "Property created successfully",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    }
  });
};

//propertyImage
exports.propertyImage = (req, res) => {
  const id = req.params.id;
  Property.findById(id)
    .select("image")
    .then((property) => {
      res.set("Content-Type", property.image.contentType);
      res.send(property.image.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
