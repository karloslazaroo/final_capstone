const mongoose = require("mongoose");
const AnalyticsSchema = new mongoose.Schema(
    {
        source: String,
        date: {
            type: String,
            default: new Date(Date.now()).toLocaleDateString()
        },
        receiver: String
    }
);
//dept cics

const Analytics = mongoose.model("AnalyticsData", AnalyticsSchema);
module.exports = Analytics;