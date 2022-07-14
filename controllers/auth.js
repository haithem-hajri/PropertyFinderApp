// auth controllers
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const JWT_SECRET = process.env.JWT_SECRET_PROD || "secret";
//signup user and check if user exist and crypt paswword with bcryptjs and send a success message to the client side in json format
exports.signup = (req, res) => {
  User.findOne({
    $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
  })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ user_exist: "Email or phone already exists" });
      } else {
        const newUser = new User(req.body);
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.avatar = null;
            newUser.save().then((user) => {
              res.status(201).json("signup success");
            });
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// login
exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ email: "Email not found" });
      }
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name,
              email: user.email, 
              mobile: user.mobile,
              hasAvatar: user.hasAvatar,
            };
            jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
              if (err) throw err;
              res.json({
                payload,
                loggedIn: true,
                token: "Bearer " + token,
              });
            });
          } else {
            return res.status(400).json({ password: "Password incorrect" });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
// logout
exports.logout = (req, res) => {
  res.json({
    loggedIn: false,
    message: "Logged out successfully",
  });
};

// get user by token  and send user data to the client side
exports.getUser = (req, res) => {
  const { id } = req.user;
  User.findById(id)
    .then((user) => {
      res.json({
        loggedIn: true,
        payload: {
          id: user.id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          hasAvatar: user.hasAvatar,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// update user email name and mobile

exports.updateUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const id = req.user.id;
  const { email, name, mobile } = req.body;
  User.findById(id)
    .then((user) => {
      if (email) {
        user.email = email;
      }
      if (name) {
        user.name = name;
      }
      if (mobile) { 
        user.mobile = mobile;
      }
      user.save().then((user) => {
        res.json({
          loggedIn: true,
          payload: {
            id: user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            hasAvatar: user.hasAvatar,
          },
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
