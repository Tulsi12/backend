const express = require("express");
const { v4: uuidv4 } = require("uuid");
const auth = require("../auth/auth");
const router = express.Router();
const Order = require("../models/orderModel");
const stripe = require("stripe")(
  "sk_test_51KScxcSChiVbg4kofSov6HL0JkRsZQ6gSq3jl8onOerUmXQ3qsYRB8YKiiaYyEQlla927AhTyBvdBGl3Fuxqjund00ZFl7E5dS"
);

router.post("/getordersbyuserid", (req, res) => {
  const userid = req.body.userid;

  Order.find({ userid: userid }, (err, docs) => {
    if (err) {
      return res.status(400).json({ message: "Something went wrong" });
    } else {
      res.send(docs);
    }
  });
});

router.post("/getorderbyid", (req, res) => {
  const orderid = req.body.orderid;

  Order.find({ _id: orderid }, (err, docs) => {
    if (err) {
      return res.status(400).json({ message: "Something went wrong" });
    } else {
      console.log(docs[0]);
      res.send(docs[0]);
    }
  });
});

router.post("/placeorder", async (req, res) => {
  console.log("in");
  var successful = false;
  const { token, cartItems, currentUser, subtotal } = req.body;
  console.log(req.body);
  const idempontencyKey = uuidv4();
  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id,
  });

  if (customer) {
    const order = new Order({
      userid: currentUser._id,
      name: currentUser.name,
      email: token.email,
      orderItems: cartItems,
      shippingAddress: {
        address: token.card.address_line1,
        city: token.card.address_city,
        country: token.card.address_country,
        postalCode: token.card.address_zip,
      },
      orderAmount: subtotal,
      transactionID: token.id,
      isDelivered: false,
    });

    order.save((err) => {
      if (err) {
        return res.status(400).json({ msg: "Somethin went wrong" });
      } else {
        res.send("Order placed successfully");
      }
    });
  }
});

router.get("/getallorders", (req, res) => {
  console.log("in here");
  Order.find({}, (err, docs) => {
    if (err) {
      return res.status(400).json({ msg: "Something went wrong", err });
    } else {
      return res.send(docs);
    }
  });
});

module.exports = router;

router.post("/submitorder", auth.verifyUser, (req, res) => {
  const userid = req.userInfo.id;
  console.log(userid);
  const name = req.userInfo.username;
  const email = req.userInfo.email;
  const orderItems = req.body.orderItems;
  const orderAmount = req.body.orderAmount;

  const order = new Order({
    userid: userid,
    name: name,
    email: email,
    orderItems: orderItems,
    orderAmount: orderAmount,
  });
  console.log(order);
  order.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ msg: "Something went wrong" });
    } else {
      res.status(200).json({msg:"Order placed successfully"});
    }
  });
  // console.log(order);

});

router.get("/getuserorders", auth.verifyUser, (req, res) => {
  const userid = req.userInfo.id;
  console.log(userid);
  Order.find({ userid: userid }, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Something went wrong" });
    } else {
      console.log(docs.length);
      return res.status(200).json({ success: true, data: docs });
    }
  });
});
