const mongoose = require("mongoose");
const AnalyticsSchema = new mongoose.Schema(
    {
        source: String,
        date: {
            type: String,
            default: new Date(Date.now()).toLocaleDateString()
        }
    }
);

const Analytics = mongoose.model("AnalyticsData", AnalyticsSchema);
module.exports = Analytics;