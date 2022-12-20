const mongoose = require("mongoose");
const messageTypeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        enum: ['Text','Document', 'Images','Videos','Audio','Location','Contact','Poll']
    },
    thumbnail:String
    // is_one_time:Boolean
}
);
module.exports = mongoose.model("messageType", messageTypeSchema);