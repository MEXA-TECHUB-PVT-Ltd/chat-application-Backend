const mongoose = require("mongoose");

const PinnedChatSchema = mongoose.Schema(
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

module.exports = mongoose.model("pinned_chat", PinnedChatSchema);
