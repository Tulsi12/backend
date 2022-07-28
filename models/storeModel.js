const mongoose = require("mongoose");

const storeSchema = mongoose.Schema(
  {
    username: {
      type: "String",
    },
    email: {
      type: "String",
    },
    password: {
      type: "String",
    },
    address: {
      type: "String",
    },
  },
  {
    timestamps: true,
  }
);

const storeModel = mongoose.model('stores',storeSchema)

module.exports =storeModel.model
