const mongoose = require('mongoose')
let momentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    }
}, { timestamps: true });

let MomentModel = mongoose.model('momnent', momentSchema)
module.exports = MomentModel