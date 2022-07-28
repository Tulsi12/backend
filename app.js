const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

const dbconfig = require("./database/db");
const productRoutes = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoute");
const userRoute = require("./routes/userRoute");
// app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoutes);

app.listen("3001", () => console.log("LISTENING AT PORT 3001"));