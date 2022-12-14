const TermsAndConditionModel = require("../models/TermsAndConditionsModel");
const mongoose = require("mongoose");

// Get All TermsAndCondition 
exports.getAllTermsAndConditions = (req, res) => {
    TermsAndConditionModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// // Get TermsAndCondition 
exports.getSpecificTermsAndCondition = (req, res) => {
    const TermsAndConditionId = req.params.TermsAndConditionId;
    TermsAndConditionModel.find({ _id: TermsAndConditionId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
}
// Delete 
exports.deleteTermsAndCondition = (req, res) => {
    const TermsAndConditionId = req.params.TermsAndConditionId;
    TermsAndConditionModel.findByIdAndDelete(TermsAndConditionId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createTermsAndCondition = async (req, res) => {
    const TermsAndCondition = new TermsAndConditionModel({
        _id: mongoose.Types.ObjectId(),
        TermsAndConditions: req.body.TermsAndConditions,
        PrivacyPolicy: req.body.PrivacyPolicy,
        AboutUs:req.body.AboutUs

    });
    TermsAndCondition.save((error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.json({ data: result, message: "Created Successfully" })
        }
    })

}
// Update 
exports.updateTermsAndCondition = async (req, res) => {
    const updateData = {
        TermsAndConditions: req.body.TermsAndConditions,
        PrivacyPolicy: req.body.PrivacyPolicy,
        AboutUs:req.body.AboutUs

    }
    const options = {
        new: true
    }
    TermsAndConditionModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



