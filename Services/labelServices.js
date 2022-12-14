const labelModel = require("../models/labelModel");
const mongoose = require("mongoose");

// Get All label 
exports.getAlllabels = (req, res) => {
    labelModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// // Get label 
exports.getSpecificlabel = (req, res) => {
    const labelId = req.params.labelId;
    labelModel.find({ _id: labelId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
}
// // Get label by userId
exports.getLabelsByUserId = (req, res) => {
    const UserId = req.params.user_id;
    labelModel.find({ user_id: UserId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
}
// Delete 
exports.deletelabel = (req, res) => {
    const labelId = req.params.labelId;
    labelModel.findByIdAndDelete(labelId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createlabel = async (req, res) => {
    const label = new labelModel({
        _id: mongoose.Types.ObjectId(),
        user_id: req.body.user_id,
        name: req.body.name,
        color:req.body.color

    });
    label.save((error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.json({ data: result, message: "Created Successfully" })
        }
    })

}
// Update 
exports.updatelabel = async (req, res) => {
    const updateData = {
        user_id: req.body.user_id,
        name: req.body.name,
        color:req.body.color

    }
    const options = {
        new: true
    }
    labelModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



