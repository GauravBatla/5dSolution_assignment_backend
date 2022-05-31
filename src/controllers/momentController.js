const { validationResult } = require('express-validator')
const base64 = require('../utils/base64image')
const MomentModel = require('../models/moment.model')
const userService = require('../services/userService')
const moment = require('moment');


exports.AddMoment = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({
                message: errors.msg,
                errors: errors.errors
            })
        }
        else {
            let payload = req.body;
            let option = {
                userId: req.userId,
                title: payload.title,
                tags: payload.tags
            }
            let img = payload.image
            option['image'] = await base64.base64toImage(img, 'upload/', moment().format('DDMMYYhhiiss'))
            let data = await userService.add(MomentModel, option)
            return res.status(201).json({
                data
            })

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error
        })
    }
};

exports.getMoment = async (req, res) => {
    try {
        let data = await userService.find(MomentModel, { userId: req.userId })
        return res.status(200).json({
            data
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
};


exports.updateMoment = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({
                message: errors.msg,
                errors: errors.errors
            })
        }
        else {
            let id = req.params.id
            let payload = req.body
            if (payload.image) {
                payload['image'] = await base64.base64toImage(payload.image, 'upload/', moment().format('DDMMYYhhiiss'))
            }
            await userService.update(MomentModel, id, payload)
            return res.status(200).json({
                message: "moment updated successfully"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error
        })
    }
} 