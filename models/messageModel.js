const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    files: Array,
    chatlist_id: {
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
    message_type_name: {
      type: String,
      enum: ['Text', 'Document', 'Images', 'Videos', 'Audio', 'Location', 'Contact', 'Poll']
    },
    docType: String,
    imageType:String,
    VideoType:String,
    locationLat:String,
    locationLong:String,
    locationAddress:String,
    userImagePointer:String,
    ContactNo:String,
    ContactName:String,
    ContactImage:String,
    staredStatus: Boolean,
    staredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    deleted_at: String,
    is_deleted: Boolean,
    repliedStatus: Boolean,
    repliedMsgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    readTime: String,
    deliveredTime: String,
    isForwarded: Boolean,
    is_one_time: Boolean

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);
