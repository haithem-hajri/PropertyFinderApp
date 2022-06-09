//Declare property schema in mongoose and create a new collection called "properties".
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;
const propertySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  nbrChambre: {
    type: Number,
    //  required: true,
  },
  nbrSalle: {
    type: Number,
    //  required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  propertyUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
propertySchema.plugin(mongoosePaginate);
const Property = mongoose.model("properties", propertySchema);
module.exports = Property;
