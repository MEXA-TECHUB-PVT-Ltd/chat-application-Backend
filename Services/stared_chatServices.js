const staredChatModel = require("../models/staredChatModel");
const mongoose = require("mongoose");

// Get All staredChat 
exports.getAllstaredChats = (req, res) => {
    staredChatModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 }).populate('chatlist_id').populate('user_id').populate('message_id')
}
// // Get staredChat 
exports.getSpecificstaredChat = (req, res) => {
    const staredChatId = req.params.staredChatId;
    staredChatModel.find({ _id: staredChatId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    }).populate('chatlist_id').populate('user_id').populate('message_id')
}
// Delete 
exports.deletestaredChat = (req, res) => {
    const staredChatId = req.params.staredChatId;
    staredChatModel.findByIdAndDelete(staredChatId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createstaredChat = async (req, res) => {
    const staredChat = new staredChatModel({
        _id: mongoose.Types.ObjectId(),
        chatlist_id: req.body.chatlist_id,
        user_id: req.body.user_id,
        message_id:req.body.message_id

    });
    staredChat.save((error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.json({ data: result, message: "Created Successfully" })
        }
    })

}
// Update 
exports.updatestaredChat = async (req, res) => {
    const updateData = {
        chatlist_id: req.body.chatlist_id,
        user_id: req.body.user_id,
        message_id:req.body.message_id

    }
    const options = {
        new: true
    }
    staredChatModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



