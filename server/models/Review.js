const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    approval: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

const Review = mongoose.model("review", ReviewSchema);
module.exports = Review;