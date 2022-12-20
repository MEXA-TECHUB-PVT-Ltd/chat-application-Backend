const messageTypeModel = require("../models/messageTypeModel");
const mongoose = require("mongoose");

// Get All messageType 
exports.getAllmessageTypes = (req, res) => {
    messageTypeModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    })
}
// // Get messageType 
exports.getSpecificmessageType = (req, res) => {
    const messageTypeId = req.params.messageTypeId;
    messageTypeModel.find({ _id: messageTypeId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
}
// Delete 
exports.deletemessageType = (req, res) => {
    const messageTypeId = req.params.messageTypeId;
    messageTypeModel.findByIdAndDelete(messageTypeId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createmessageType = async (req, res) => {
    const messageType = new messageTypeModel({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        thumbnail:req.body.thumbnail
    });
    messageType.save((error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.json({ data: result, message: "Created Successfully" })
        }
    })

}
// Update 
exports.updatemessageType = async (req, res) => {
    const updateData = {
        name: req.body.name,
        thumbnail:req.body.thumbnail
    }
    const options = {
        new: true
    }
    messageTypeModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



