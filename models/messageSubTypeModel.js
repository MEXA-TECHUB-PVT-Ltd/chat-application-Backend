const mongoose = require("mongoose");
const messageSubTypeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    message_type_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'messageType'
      },
    name:String,
    thumbnail:String
}
);
module.exports = mongoose.model("messageSubType", messageSubTypeSchema);