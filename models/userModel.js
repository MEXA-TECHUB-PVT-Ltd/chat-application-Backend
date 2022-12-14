const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    activity_status_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'activity_status'
},
    username: String,
    first_name: String,
    last_name: String,
    phone_no:String,
    latest_verification_code:String,
    bio:String,
    image: String,
    online_status:String,
    admin_block_status:String,
    created_at:String,
    updated_at:String,
    privacy:String,
    isLogin:Boolean,
    // chatLists:[{
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'chat_list'
    // }]
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    age:String,
    status:String
}
);
module.exports = mongoose.model("user", userSchema);