const mongoose = require("mongoose");
const messageTypeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        // enum: ['Delivered and Seen', 'Delivered and Not Seen','Sent But Not Delivered','Seen']
    },
    is_one_time:Boolean
}
);
module.exports = mongoose.model("messageType", messageTypeSchema);