const mongoose = require("mongoose");

const chat_listSchema = mongoose.Schema(
  {

    // chat_room: String,
    // firstUser: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
    // secondUser: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      }
    ],
    deleted_at: String,
    is_deleted: Boolean,
    extraAttribute: [{
      // firstUser:
      // {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "user",
      //   required: true,
      // }, secondUser: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "user",
      //   required: true,
      // }
    }],
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chat_list", chat_listSchema);
