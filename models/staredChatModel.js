const mongoose = require("mongoose");
const stared_chatSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    chatlist_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat_list",
      },
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
module.exports = mongoose.model("stared_chat", stared_chatSchema);