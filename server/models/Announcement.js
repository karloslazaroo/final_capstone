const mongoose = require("mongoose");

const AnnounceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
});

const Announce = mongoose.model("announceData", AnnounceSchema);
module.exports = Announce;