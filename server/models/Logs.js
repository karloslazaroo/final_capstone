const mongoose = require("mongoose");

const LogsSchema = new mongoose.Schema({
    date: {
        type: String,
        //default: new Date().toLocaleString({timeZone: "Asia/Hong_Kong"}),//new Date(Date.now()).toLocaleDateString() +' '+new Date(Date.now()).toLocaleTimeString()
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