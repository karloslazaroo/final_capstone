const mongoose = require("mongoose");

const OfficeSchema = new mongoose.Schema({
    offi: {
        type: String,
        required: true,
    }
});

const Office = mongoose.model("officeData", OfficeSchema);
module.exports = Office;