const mongoose = require("mongoose");
const messageStatusSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        enum: ['Delivered and Not Seen','Sent But Not Delivered','Seen','Delivered and Seen']
    },
}
);
module.exports = mongoose.model("messageStatus", messageStatusSchema);