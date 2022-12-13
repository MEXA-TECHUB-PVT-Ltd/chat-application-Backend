const mongoose = require("mongoose");

const chat_listSchema = mongoose.Schema(
  {
    
    chat_room:String,
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      }
    ],
    deleted_at:String,
    is_deleted:Boolean
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chat_list", chat_listSchema);
