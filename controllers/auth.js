// auth controllers
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const { body, checkSchema, validationResult } = require("express-validator");


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
  console.log("JWT_SECRET", JWT_SECRET);
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
//update avatar
exports.updateAvatar = (req, res) => {
  const id = req.user.id;
  const form = new formidable.IncomingForm();
  const uploadFolder = path.join(__dirname, "../public", "files");
  form.multiples = true;
  form.keepExtensions = true;
  form.uploadDir = uploadFolder;
  User.findById(id).exec((err, oldAvatar) => {
    if (err) {
      return res.status(400).json({
        error: "Error find",
      });
    }

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not upload",
        });
      }

      if (files.avatar) {
        if (files.avatar.size > 10000000) {
          return res.status(400).json({
            error: "Image should be less then 1mb in size",
          });
        }
        oldAvatar.avatar.data = fs.readFileSync(files.avatar.filepath);
        oldAvatar.avatar.contentType = files.avatar.mimetype;
        oldAvatar.hasAvatar = true;
      }

      oldAvatar.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: "Error Update",
          });
        }
        // result.photo = undefined;
        res.json("result");
      });
    });
  });
};

// get user by token  and send user data to the client side
exports.getUser = (req, res) => {
  console.log("reqelment", req);
  console.log("reqbbi", req.headers.authorization);
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
// get user by token and send user data to the client side
exports.userAvatar = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .select("avatar")
    .then((user) => {
      res.set("Content-Type", user.avatar.contentType);
      res.send(user.avatar.data);
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

// update password
exports.updatePassword = (req, res) => {
  const { password } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      User.findByIdAndUpdate(req.user.id, {
        password: hash,
      })
        .then((user) => {
          res.json(user);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    });
  });
};
