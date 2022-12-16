const mongoose = require("mongoose");

const LabelSchema = mongoose.Schema(
  {
   
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name:String,
    color:String,
  },
);

module.exports = mongoose.model("label", LabelSchema);
