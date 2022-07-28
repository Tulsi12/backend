const express = require("express");
const Product = require("../models/productModel");
const router = express.Router();
const upload = require("../file/upload");
const auth = require("../auth/auth");
const { verify } = require("jsonwebtoken");
const { route } = require("./userRoute");

//display
// react
router.get("/getallproducts", (req, res) => {
  Product.find({}, (err, docs) => {
    if (!err) {
      return res.send({ success: true, count: docs.length, data: docs });
    } else {
      return res.status(400).json({ message: "Something went wrong." });
    }
  });
});

// flutter
// router.get("/getallproducts", (req, res) => {
//   Product.find({}, (err, docs) => {
//     if (!err) {
//       return res.send(docs);
//     } else {
//       return res.status(400).json({ message: "Something went wrong." });
//     }
//   });
// });

router.post("/getproductbyid", (req, res) => {
  Product.find({ _id: req.body.productid }, (err, docs) => {
    if (!err) {
      res.send(docs[0]);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
});

//route to add review to to the products
router.post("/addreview", auth.verifyUser, async (req, res) => {
  console.log("In");
  const { review, productid, currentUserData } = req.body;
  console.log("hey");
  console.log(productid);

  const product = await Product.findById({ _id: productid });

  const reviewmodel = {
    name: currentUserData.username,
    userid: currentUserData._id,
    rating: review.rating,
    comment: review.comment,
  };

  product.reviews.push(reviewmodel);

  var rating =
    product.reviews.reduce((acc, x) => acc + x.rating, 0) /
    product.reviews.length;

  product.rating = rating;

  product.save((err) => {
    if (err) {
      return res.status(400).json({ message: "Something went wrong" });
    } else {
      res.send("Review submitted successfully");
    }
  });
});

router.post("/deleteproduct", auth.verifyAdmin, function (req, res) {
  Product.findByIdAndDelete(req.body.productid)
    .then(function () {
      res.status(200).json({ msg: "Product deleted", success: true });
    })
    .catch(function () {
      res.status(400).json({ msg: "Operation Unsuccessful", success: false });
    });
});

router.post("/updateProduct", function (req, res) {
  console.log("updating");
  const productid = req.body.productid;
  const name = req.body.updatedProduct.name;
  const price = req.body.updatedProduct.price;
  const description = req.body.updatedProduct.description;
  const countInStock = req.body.updatedProduct.countInStock;
  const image = req.body.updatedProduct.image;

  Product.findByIdAndUpdate(
    productid,
    {
      name: name,
      price: price,
      description: description,
      countInStock: countInStock,
      image: image,
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

router.post("/addproduct", function (req, res) {
  console.log("product adding");
  console.log(req.body);

  const name = req.body.name;
  const price = req.body.price;
  const description = req.body.description;
  const countInStock = req.body.countInStock;
  const image = req.body.imageurl;
  const category = req.body.category;

  try {
    const productdata = new Product({
      name: name,
      price: price,
      description: description,
      countInStock: countInStock,
      image: image,
      category: category,
    });

    // console.log(productdata);
    productdata
      .save()
      .then(res.status(200).json({ msg: "User registered sucessfully" }));
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "something went wrong", success: false });
  }
});

// router.post("/addproduct", function (req, res) {
//   console.log("product adding");
//   console.log(req.body);

//   const name = req.body.product.name;
//   const price = req.body.product.price;
//   const description = req.body.product.description;
//   const countInStock = req.body.product.countInStock;
//   const image = req.body.product.imageurl;
//   const category = req.body.product.category;

//   try {
//     const productdata = new Product({
//       name: name,
//       price: price,
//       description: description,
//       countInStock: countInStock,
//       image: image,
//       category: category,
//     });

//     // console.log(productdata);
//     productdata
//       .save()
//       .then(res.status(200).json({ msg: "User registered sucessfully" }));
//   } catch (error) {
//     return res
//       .status(400)
//       .json({ msg: "something went wrong", success: false });
//   }
// });

module.exports = router;
