const mongoose = require("mongoose");
const replyMessageSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    message_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Messages'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
}
);
module.exports = mongoose.model("replyMessage", replyMessageSchema);