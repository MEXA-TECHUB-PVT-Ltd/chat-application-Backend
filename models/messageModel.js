const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    chatlist_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat_list",
    },
    users: Array,
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message_status_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'messageStatus'
    },
    message_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'messageType'
    }, 
    message_subtype_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'messageSubType'
    },
    deleted_at:String,
    is_deleted:Boolean

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);
