const mongoose = require("mongoose");

const OrderModel = mongoose.model("Order", {
    userid: {
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    orderItems: [{
        productID: {
            type: String,
        },
        name: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 1,
        },
        price: {
            type: Number,
        },
        imageUrl: {
            type: String,
        },
    }, ],
    shippingAddress: {
        address: { type: String },
        city: { type: String },
        postalCode: {
            type: Number,
        },
        country: {
            type: String,
        },
    },
    orderAmount: {
        type: Number,
    },
    transactionID: {
        type: String,
    },
    isDelivered: {
        type: Boolean,
    },
});

module.exports = OrderModel;