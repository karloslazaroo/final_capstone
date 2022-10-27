const mongoose = require("mongoose");

const FaqsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
});

const Faqs = mongoose.model("faqsData", FaqsSchema);
module.exports = Faqs;