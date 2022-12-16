const mongoose = require("mongoose");
const activity_statusSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String
}
);
module.exports = mongoose.model("activity_status", activity_statusSchema);