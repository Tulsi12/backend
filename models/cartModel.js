const mongoose = require("mongoose");

const CartModel = mongoose.model("Cart", {
    userid: {
        type: mongoose.Schema.Types.ObjectId,
    },
    products: [{
        productID: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 1,
        }
    }, ],
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },

});

module.exports = CartModel;