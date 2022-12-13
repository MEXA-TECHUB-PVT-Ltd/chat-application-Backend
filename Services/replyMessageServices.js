const replyMessageModel = require("../models/replyMessageModel");
const mongoose = require("mongoose");

// Get All replyMessage 
exports.getAllreplyMessages = (req, res) => {
    replyMessageModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 }).populate('message_id').populate('user_id')
}
// // Get replyMessage 
exports.getSpecificreplyMessage = (req, res) => {
    const replyMessageId = req.params.replyMessageId;
    replyMessageModel.find({ _id: replyMessageId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    }).populate('message_id').populate('user_id')
}
// Delete 
exports.deletereplyMessage = (req, res) => {
    const replyMessageId = req.params.replyMessageId;
    replyMessageModel.findByIdAndDelete(replyMessageId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createreplyMessage = async (req, res) => {
    const replyMessage = new replyMessageModel({
        _id: mongoose.Types.ObjectId(),
        message_id: req.body.message_id,
        user_id: req.body.user_id

    });
    replyMessage.save((error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.json({ data: result, message: "Created Successfully" })
        }
    })

}
// Update 
exports.updatereplyMessage = async (req, res) => {
    const updateData = {
        message_id: req.body.message_id,
        user_id: req.body.user_id

    }
    const options = {
        new: true
    }
    replyMessageModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



