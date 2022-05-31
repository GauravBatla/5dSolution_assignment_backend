var jwt = require('jsonwebtoken');
var JWT_SECREATE_kEY = 'secret';
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    try {
        var bearer = req.headers.authorization.split(" ");
        token = bearer[1];
        var decode = jwt.verify(token, JWT_SECREATE_kEY);
        console.log(decode,"decode");
        if (decode.userId) {
            req.userId = decode.userId
            req.userEmail = decode.email
            mongoose.connection.db.collection('users').findOne({ email: decode.email}).then(data => {
                if (!data) {
                    res.status(401).json({
                        status: 401,
                        message: "Failed to authenticate token."
                    })
                }
                else {
                    next()
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({
            status: 401,
            message: "Failed to authenticate token."
        })
    }
}
