const User = require("../models/userModel");
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

describe("Testing user schema", () => {
    //the code below is for insert testing
    it("Add user testing", () => {
        const userData = {
            username: "user1",
            email: "user1@gmail.com",
            password: "password",
        };
        return User.create(userData).then((user_ret) => {
            expect(user_ret.username).toEqual("user1");
        });
    });
    //testing if the update is working
    it("Updating the user testing", async() => {
        const status = await User.updateOne({ username: "user1" }, {
            username: "user11",
            password: "newpassword",
        });
        expect(status.ok);
    });

    // delete testing;
    it("Deleting the user teting", async() => {
        const status = await User.findOneAndDelete({ username: "user11" });
        expect(status.ok);
    });

    //the below code is for update testing here
});