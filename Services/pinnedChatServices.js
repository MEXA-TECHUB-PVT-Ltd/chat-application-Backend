const pinnedChatModel = require("../models/pinnedChatModel");
const mongoose = require("mongoose");

// Get All pinnedChat 
exports.getAllpinnedChats = (req, res) => {
    pinnedChatModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 }).populate('chatlist_id').populate('user_id')
}
// // Get pinnedChat 
exports.getSpecificpinnedChat = (req, res) => {
    const pinnedChatId = req.params.pinnedChatId;
    pinnedChatModel.find({ _id: pinnedChatId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    }).populate('chatlist_id').populate('user_id')
}
// Delete 
exports.deletepinnedChat = (req, res) => {
    const pinnedChatId = req.params.pinnedChatId;
    pinnedChatModel.findByIdAndDelete(pinnedChatId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createpinnedChat = async (req, res) => {
    const pinnedChat = new pinnedChatModel({
        _id: mongoose.Types.ObjectId(),
        chatlist_id: req.body.chatlist_id,
        user_id: req.body.user_id

    });
    pinnedChat.save((error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.json({ data: result, message: "Created Successfully" })
        }
    })

}
// Update 
exports.updatepinnedChat = async (req, res) => {
    const updateData = {
        chatlist_id: req.body.chatlist_id,
        user_id: req.body.user_id

    }
    const options = {
        new: true
    }
    pinnedChatModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



