const mongoose = require("mongoose");

const ArchievedChatSchema = mongoose.Schema(
  {
    chatlist_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat_list",
      },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
  },
);

module.exports = mongoose.model("archieved_chat", ArchievedChatSchema);
