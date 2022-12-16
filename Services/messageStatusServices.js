const messageStatusModel = require("../models/messageStatusModel");
const mongoose = require("mongoose");

// Get All messageStatus 
exports.getAllmessageStatuss = (req, res) => {
    messageStatusModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// // Get messageStatus 
exports.getSpecificmessageStatus = (req, res) => {
    const messageStatusId = req.params.messageStatusId;
    messageStatusModel.find({ _id: messageStatusId }, function (err, foundResult) {
        try {
            res.json({data:foundResult})
        } catch (err) {
            res.json(err)
        }
    })
}
// Delete 
exports.deletemessageStatus = (req, res) => {
    const messageStatusId = req.params.messageStatusId;
    messageStatusModel.findByIdAndDelete(messageStatusId, (error, result) => {
        if (error) {
            res.send({message:error.message})
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createmessageStatus = async (req, res) => {
    messageStatusModel.find({ name: req.body.name }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                const messageStatus = new messageStatusModel({
                    _id: mongoose.Types.ObjectId(),
                   name:req.body.name
                
                });
                messageStatus.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.json({data:result,message:"Created Successfully"})
                    }
                })

            } else {
                res.json({data:result,message:"Status Already Exist"})

            }
        }
    })

}
// Update 
exports.updatemessageStatus = async (req, res) => {
    const updateData = {
       name:req.body.name
    }
    const options = {
        new: true
    }
    messageStatusModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({data:result,message:"Updated Successfully"})
        }
    })
}



