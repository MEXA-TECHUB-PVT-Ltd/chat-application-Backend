const messageSubTypeModel = require("../models/messageSubTypeModel");
const mongoose = require("mongoose");

// Get All messageSubType 
exports.getAllmessageSubTypes = (req, res) => {
    messageSubTypeModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 }).populate('message_type_id')
}
// // Get messageSubType 
exports.getSpecificmessageSubType = (req, res) => {
    const messageSubTypeId = req.params.messageSubTypeId;
    messageSubTypeModel.find({ _id: messageSubTypeId }, function (err, foundResult) {
        try {
            res.json({data:foundResult})
        } catch (err) {
            res.json(err)
        }
    }).populate('message_type_id')
}
// Delete 
exports.deletemessageSubType = (req, res) => {
    const messageSubTypeId = req.params.messageSubTypeId;
    messageSubTypeModel.findByIdAndDelete(messageSubTypeId, (error, result) => {
        if (error) {
            res.send({message:error.message})
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createmessageSubType = async (req, res) => {
    messageSubTypeModel.find({ name: req.body.name }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                const messageSubType = new messageSubTypeModel({
                    _id: mongoose.Types.ObjectId(),
                    message_type_id:req.body.message_type_id,
                    name:req.body.name,
                    thumbnail:req.body.thumbnail
                
                });
                messageSubType.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.json({data:result,message:"Created Successfully"})
                    }
                })

            } else {
                res.json({data:result,message:"SubType Already Exist"})

            }
        }
    })

}
// Update 
exports.updatemessageSubType = async (req, res) => {
    const updateData = {
        message_type_id:req.body.message_type_id,
        name:req.body.name,
        thumbnail:req.body.thumbnail
    }
    const options = {
        new: true
    }
    messageSubTypeModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({data:result,message:"Updated Successfully"})
        }
    })
}



