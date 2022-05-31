const { check, param } = require('express-validator')

exports.AddMoment = [
    check('image').notEmpty().withMessage("Image is required").matches(/^data:([A-Za-z-+\/]+);base64,(.+)$/).withMessage("only accept base 64 text"),
    check('title').notEmpty().withMessage("title is required"),
    check('tags').notEmpty().withMessage("tags are required")
];

exports.updateMoment = [
    param('id').exists().withMessage('param id')
]