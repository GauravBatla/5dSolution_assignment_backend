const { validationResult } = require('express-validator')
const userService = require('../services/userService')
const UserModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({
                message: errors.msg,
                errors: errors.errors
            })
        }
        else {
            let data = await userService.add(UserModel, req.body)
            return res.status(201).json({
                data
            })

        }
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(422).json({
                message: errors.msg,
                errors: errors.errors
            })
        } else {
            let payload = req.body
            const user = await UserModel.findOne({ email: payload.email });
            if (!user) {
                return res.status(401).json({
                    message: "innvalid credentials"
                })
            }

            let isPasswordMatched = await bcrypt.compare(payload.password, user.password);
            if (!isPasswordMatched) {
                return res.status(401).json({ message: "Invalid Credentials" });
            } else {
                const JWT_EXP_DUR = 1000
                const accessToken = jwt.sign({ userId: user._id.toString(),email:user.email, exp: Math.floor(Date.now() / 1000) + ((JWT_EXP_DUR) * 60), }, 'secret');
                return res.status(200).json({
                    message: "Loggedin successfully",
                    accessToken
                })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error
        })
    }
}




