const mongoose = require("mongoose");

const LogsSchema = new mongoose.Schema({
    date: {
        type: String,
        default: new Date(Date.now()).toLocaleString() 
    },
    email: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

const Logs = mongoose.model("logsData", LogsSchema);
module.exports = Logs;