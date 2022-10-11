const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    office: {
        type: String,
        required: true,
    },
});

const Admin = mongoose.model("manageAdmin", AdminSchema);
module.exports = Admin;