const express = require("express");
const jwt = require("jsonwebtoken");

const bcryptjs = require("bcryptjs");
const router = new express.Router();
const auth = require("../auth/auth");

const store = require("../models/storeModel");

router.post("/register", function (req, res) {
  const username = req.body.username;
  console.log("hello");
  console.log(username);
  store.findOne({ username: username }).then(function (data) {
    console.log(data);

    if (data != null) {
      res.join({ msg: "Username already exists", success: false });
      return;
    }
    const password = req.body.password;

    bcryptjs.hash(password, 10, function (e, hased_pw) {
      const storeData = new store({
        username: username,
        password: hased_pw,
      });
      storeData.save().then;
    });
  });
});

router.post("/login", function (req, res) {
  const username = req.body.username;
  store.findOne({ username: username }).then(function (userData) {
    if (userData === null) {
      res.json({
        msg: "User with this username does not exist.",
        success: false,
      });
      return;
    }

    const password = req.body.password;
    bcryptjs.compare(password, userData.password, function (e, result) {
      if (result == false) {
        return res.json({ msg: "Invalid password", success: false });
      }
      const token = jwt.sign({ uid: userData._id }, "anysecretkey");
      res.json({ token: token, success: true });
    });
  });
});

router.delete("/delete", auth.verifyStore, function (req, res) {
  const id = req.storeInfo._id;

  store
    .deleteOne({ _id: id })
    .then(function (result) {
      res
        .status(200)
        .json({ message: "data deleted successfully !", success: true });
    })
    .catch(function (e) {
      res.status(500).json({ error: e });
    });
});

module.exports = router;
