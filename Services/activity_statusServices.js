const activity_statusModel = require("../models/activity_statusModel");
const mongoose = require("mongoose");

// Get All activity_status 
exports.getAllactivity_statuss = (req, res) => {
    activity_statusModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// // Get activity_status 
exports.getSpecificactivity_status = (req, res) => {
    const activity_statusId = req.params.activity_statusId;
    activity_statusModel.find({ _id: activity_statusId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
}
// Delete 
exports.deleteactivity_status = (req, res) => {
    const activity_statusId = req.params.activity_statusId;
    activity_statusModel.findByIdAndDelete(activity_statusId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createactivity_status = async (req, res) => {
    const activity_status = new activity_statusModel({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,

    });
    activity_status.save((error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.json({ data: result, message: "Created Successfully" })
        }
    })

}
// Update 
exports.updateactivity_status = async (req, res) => {
    const updateData = {
        name: req.body.name,

    }
    const options = {
        new: true
    }
    activity_statusModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



