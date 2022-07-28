const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const mongoose = require("mongoose");

const url = 'mongodb://127.0.0.1:27017/ship_shop';

beforeAll(async() => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async() => {
    await mongoose.connection.close();
});

describe("Testing product schema", () => {
    //the code below is for insert testing
    it("Add product in db testing", () => {
        const product = {
            name: "Dress",
            price: 250,
        };
        return Product.create(product).then((pro_ret) => {
            expect(pro_ret.name).toEqual("Dress");
        });
    });

    //testing if the update is working
    it("Updating the added product testing", async() => {
        const status = await Product.updateOne({ name: "Dress" }, {
            name: "T-shirt",
            price: "300",
        });
        expect(status.ok);

        // .then((res) => {
        //   expect(res.name).toEqual("Apple");
        // });
    });
    //the below code is for delete testing

    // delete testing;
    it("Deleting the product testing", async() => {
        const status = await Product.findOneAndDelete({ name: "T-shirt" });
        expect(status.ok);
    });

    //the below code is for update testing here
});