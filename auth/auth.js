const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports.verifyUser = function(req, res, next) {
    try {
        // token = req.headers.authorization.split(" ")[1];
        // const data = jwt.verify(token, "anysecretkey");
        // console.log("checking---");
        token = req.body.tok;
        const data = jwt.verify(token, "anysecretkey");
        User.findOne({ _id: data.uid })
            .then(function(result) {

                req.userInfo = result;
                next();
            })
            .catch(function(e) {
                res.status(400).json({ msg: "Invalid token", error: e });
            });
    } catch (e) {
        res.status(400).json({ msg: "Invalid token", error: e });
    }
};

module.exports.verifyAdmin = function(req, res, next) {
    try {
        token = req.body.tok;
        const data = jwt.verify(token, "anysecretkey");
        User.findOne({ _id: data.uid })
            .then(function(result) {
                if (result.isAdmin) {
                    req.userInfo = result;
                    next();
                } else {
                    res.status(400).json({ msg: "User is not an admin" });
                }
            })
            .catch(function(e) {
                res.status(400).json({ msg: "Invalid token", error: e });
            });
    } catch (e) {
        res.status(400).json({ msg: "Invalid token", error: e });
    }
};

// const jwt = require("jsonwebtoken");
// const user = require("../models/userModel");

// module.exports.verifyUser = (req, res, next) => {
//   try {
//     token = req.headers.authorization.split(" ")[1];
//     const data = jwt.verify(token, process.env.JWT_SECRET);
//     user
//       .findOne({ $and: [{ _id: data.uid }, { is_admin: false }] })
//       .then(function (result) {
//         req.userInfo = result;
//         next();
//       })
//       .catch(function (e) {
//         res.json({ msg: e, success: false });
//       });
//   } catch (error) {
//     res.json({ msg: "Invalid Token", success: false });
//   }
// };