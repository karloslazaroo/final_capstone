const mongoose = require("mongoose");

const ChatbotSchema = new mongoose.Schema({
    mail: {
        type: String,
        required: true,
    },
    projId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
});

const Chatbot = mongoose.model("chatbotData", ChatbotSchema);
module.exports = Chatbot;