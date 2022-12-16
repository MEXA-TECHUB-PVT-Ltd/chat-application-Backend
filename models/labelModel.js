const mongoose = require("mongoose");

const LabelSchema = mongoose.Schema(
  {
   
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name:String,
    color:String,
    count:String,
    chatList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat_list",
      }
    ],
  },
);

module.exports = mongoose.model("label", LabelSchema);
