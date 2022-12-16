const archievedChatModel = require("../models/archieved-chatModel");
const mongoose = require("mongoose");

// Get All archievedChat 
exports.getAllarchievedChats = (req, res) => {
    archievedChatModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 }).populate('chatlist_id').populate('user_id')
}
// // Get archievedChat 
exports.getSpecificarchievedChat = (req, res) => {
    const archievedChatId = req.params.archievedChatId;
    archievedChatModel.find({ _id: archievedChatId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    }).populate('chatlist_id').populate('user_id')
}
// Delete 
exports.deletearchievedChat = (req, res) => {
    const archievedChatId = req.params.archievedChatId;
    archievedChatModel.findByIdAndDelete(archievedChatId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createarchievedChat = async (req, res) => {
    const archievedChat = new archievedChatModel({
        _id: mongoose.Types.ObjectId(),
        chatlist_id: req.body.chatlist_id,
        user_id: req.body.user_id

    });
    archievedChat.save((error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.json({ data: result, message: "Created Successfully" })
        }
    })

}
// Update 
exports.updatearchievedChat = async (req, res) => {
    const updateData = {
        chatlist_id: req.body.chatlist_id,
        user_id: req.body.user_id

    }
    const options = {
        new: true
    }
    archievedChatModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



