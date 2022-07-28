const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const auth = require("../auth/auth");
const User = require("../models/userModel");
const upload = require("../file/upload");

router.post("/register", function (req, res) {
  console.log(req.body);
  const email = req.body.email;
  const username = req.body.username;
  User.findOne({ username: username }).then(function (data) {
    if (data != null) {
      return res
        .status(400)
        .json({ msg: "Username already exists", success: false });
    }
    const password = req.body.password;

    bcryptjs.hash(password, 10, function (e, hased_pw) {
      try {
        const userData = new User({
          username: username,
          email: email,
          password: hased_pw,
        });
        console.log(userData);
        userData
          .save()
          .then(res.status(200).json({ msg: "User registered sucessfully" }));
      } catch (error) {
        return res
          .status(400)
          .json({ msg: "something went wrong", success: false });
      }
    });
  });
});

router.post("/login", function async(req, res) {
  const username = req.body.username;
  console.log(username);
  User.findOne({ username: username }).then(function (userData) {
    if (userData === null) {
      res.status(400).json({
        msg: "User with this username does not exist.",
        success: false,
      });
      return;
    }

    const password = req.body.password;
    bcryptjs.compare(password, userData.password, function (e, result) {
      if (result == false) {
        return res
          .status(400)
          .json({ msg: "Invalid password", success: false });
      }
      const token = jwt.sign({ uid: userData._id }, "anysecretkey");

      res.status(200).json({ token: token, success: true, userData });
    });
  });
});

router.post("/update", function (req, res) {
  console.log("updating");
  const userid = req.body.userid;
  const updateduser = req.body.updateduser;
  User.findByIdAndUpdate(
    userid,
    {
      username: updateduser.username,
      email: updateduser.email,
    },
    (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong", err });
      } else {
        res.send("User details updated successfully.");
      }
    }
  );
});

router.get("/profile", auth.verifyUser, function (req, res) {
  console.log(req.userInfo.username);
  try {
    res.status(200).json({
      success: true,
      data: [
        {
          username: req.userInfo.username,
          email: req.userInfo.email,
          password: req.userInfo.password,
          isAdmin: req.userInfo.isAdmin,
        },
      ],
    });
  } catch (error) {
    res.status(400).json({ msg: "something went wrong" });
  }
});

router.post("/deleteuser", function (req, res) {
  console.log("in");
  User.findByIdAndDelete(req.body.userid)
    .then(function () {
      res.status(200).json({ msg: "User deleted", success: true });
    })
    .catch(function () {
      res.status(400).json({ msg: "Operation Unsuccessful", success: false });
    });
});

router.post("/updateprofile", auth.verifyUser, function (req, res) {
  const userid = req.userInfo.id;
  const username = req.body.username;
  const email = req.body.email;

  User.findByIdAndUpdate(
    userid,
    {
      username: username,
      email: email,
    },
    (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong", err });
      } else {
        console.log("sucess");
        return res.status(200).json({ msg: "User updated successfully" });
      }
    }
  );
});

router.get("/getallusers", (req, res) => {
  User.find({}, (err, docs) => {
    if (err) {
      return res.status(400).json({ message: "Something went wrong" });
    } else {
      res.send(docs);
    }
  });
});

router.put(
  "/photo",
  upload.single("photo"),
  auth.verifyUser,
  function (req, res) {
    const id = req.userInfo._id;
    const file = req.file;
    console.log(req.files);
    User.updateOne(
      { _id: id },
      { photo: req.file.path },
      function (err, result) {
        if (err) {
          res
            .status(400)
            .json({ msg: "Error uploading photo", success: false });
        } else {
          res.status(200).json({ msg: "File Uploaded", success: true });
        }
      }
    );
  }
);

router.post("/product/insert", upload.single("pimage"), function (req, res) {
  if (req.file == undefined) {
    return res.json({
      message: "only jpeg files allowed!",
    });
  }

  const product = new Product({
    name: pname,
    pprice: pprice,
    file_name: file.file_name,
  });
  product.save().then().catch();
});

router.post("/checkusername", function (req, res) {
  const username = req.body.username;
  User.findOne({ username: username }).then(function (data) {
    if (data != null) {
      return res.status(200).json({ msg: "user found", data: data });
    } else {
      return res.send(400).json({ msg: "User not found" });
    }
  });
});
module.exports = router;
