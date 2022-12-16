const mongoose = require("mongoose");

const LabelChatSchema = mongoose.Schema(
  {
   
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    chatlist_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat_list",
      },
      label_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "label",
      },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("labeled_chat", LabelChatSchema);
