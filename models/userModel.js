const mongoose = require("mongoose");

const User = mongoose.model("users", {
  username: {
    type: "String",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: "String",
  },
  address: {
    type: "String",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = User;
