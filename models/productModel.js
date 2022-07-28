const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String,
    },
    comment: {
        type: String,
    },
    rating: {
        type: Number,
    },
}, { timeStamps: true });

const productModel = mongoose.model("products", {
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    countInStock: {
        type: Number,
        require: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: [reviewSchema],
});

module.exports = productModel;