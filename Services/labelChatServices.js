const labelChatModel = require("../models/labeled_chatModel");
const mongoose = require("mongoose");

// Get All labelChat 
exports.getAlllabelChats = (req, res) => {
    labelChatModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
    .populate('chatlist_id')
    .populate('user_id')

}
// // Get labelChat 
exports.getSpecificlabelChat = (req, res) => {
    const labelChatId = req.params.labelChatId;
    labelChatModel.find({ _id: labelChatId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })   
    .populate('chatlist_id')
    .populate('user_id')
}
// Delete 
exports.deletelabelChat = (req, res) => {
    const labelChatId = req.params.labelChatId;
    labelChatModel.findByIdAndDelete(labelChatId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createlabelChat = async (req, res) => {
    
    const labelChat = new labelChatModel({
        _id: mongoose.Types.ObjectId(),
        user_id: req.body.user_id,
        chatlist_id: req.body.chatlist_id,
        label_id:req.body.label_id

    });
    labelChat.save((error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.json({ data: result, message: "Created Successfully" })
        }
    })

}
// Update 
exports.updatelabelChat = async (req, res) => {
    const updateData = {
        user_id: req.body.user_id,
        chatlist_id: req.body.chatlist_id,
        label_id:req.body.label_id

    }
    const options = {
        new: true
    }
    labelChatModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



