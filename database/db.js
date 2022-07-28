const mongoose = require('mongoose');

var monogoUrl = 'mongodb://127.0.0.1:27017/ship_shop';


mongoose.connect(monogoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var connection = mongoose.connection;

connection.on("error", () => {
    console.log("Mongo DB Connection Failed");
});

connection.on("connected", () => {
    console.log("Mongo DB Connection Sucessful");
});


module.exports = mongoose