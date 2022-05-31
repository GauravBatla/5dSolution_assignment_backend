const { check } = require('express-validator')
const UserModel = require('../models/user.model')

exports.SignUpUser = [
    check('fname').notEmpty().withMessage("First name is required"),
    check('lname').notEmpty().withMessage("Last name is required"),
    check('mobile').notEmpty().withMessage("Mobile nuber is required").isInt().withMessage("Enter Valid input").isLength({ min: 10, max: 10 }).withMessage("Enter Valid Number"),
    check('email').notEmpty().withMessage("First name is required").isEmail().withMessage("Enter Valid email").custom((email) => {
        return UserModel.findOne({ email: email }).then(data => {
            if (data) {
                return Promise.reject('email already used')
            }
        })
    }),
    check('city').notEmpty().withMessage("City is required"),
    check('password').notEmpty().withMessage("password is required"),
]

exports.login = [
    check('email').notEmpty().withMessage("Email is required").isEmail().withMessage("Enter valid Email").custom((email) => {
        return UserModel.findOne({ email }).then((res) => {
            if (!res) {
                return Promise.reject('Email not found our record')
            }
        })
    }),
    check('password').notEmpty().withMessage("password is required"),
]