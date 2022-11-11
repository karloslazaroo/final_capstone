const mongoose = require("mongoose");

const AnnounceSchema = new mongoose.Schema({
    title: {
        type: String,
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
    },
    date: {
        type: String,
        
    }
});

const Announce = mongoose.model("announceData", AnnounceSchema);
module.exports = Announce;