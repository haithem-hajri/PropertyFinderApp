const express = require("express");
router = express.Router();
const { requireLogin } = require("../middlware/auth-middlware");
const {
  signup,
  login,
  logout,
  updateUser,
  updatePassword,
  getUser,
  userAvatar,
  updateAvatar,
} = require("../controllers/auth");
const {
  userSignupValidator,
  userSigninValidator,
  updateUserSchema
} = require("../validation/auth-validation");


const { runValidation } = require("../validation");
router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/login", userSigninValidator, runValidation, login);
router.get("/getUser", requireLogin, getUser);
router.put("/updateAvatar", requireLogin, updateAvatar);
//get image
router.get("/user/image/:id",userAvatar)
router.post("/logout", logout);
router.put("/updateUser",requireLogin ,updateUserSchema,runValidation,updateUser)
router.put("/updatePassword", requireLogin, updatePassword);

module.exports = router;

//// Validate incoming input //updateUserSchema 
//const errors = validationResult(req);
