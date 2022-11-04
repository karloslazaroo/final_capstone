const mongoose = require("mongoose");

const FaqsSchema = new mongoose.Schema({
    question: {
        type: String,
    },
    answer: {
        type: String,
    },
});

const Faqs = mongoose.model("faqsData", FaqsSchema);
module.exports = Faqs;