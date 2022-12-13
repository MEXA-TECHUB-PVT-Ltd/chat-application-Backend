const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    
    chat_room:String,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    created_at:String,
    updated_at:String,
    deleted_at:String,
    is_deleted:Boolean

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);
