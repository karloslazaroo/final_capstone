const mongoose = require("mongoose");

const TalkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

const Talk = mongoose.model("talktous", TalkSchema);
module.exports = Talk;