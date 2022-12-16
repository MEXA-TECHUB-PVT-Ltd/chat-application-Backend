const userModel = require("../models/userModel");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
// const forgetPasswordModel = require("../models/forgetPasswordModel");
var nodemailer = require('nodemailer')
const phoneNo = process.env.phoneNumber;

const client = require('twilio')(accountSid, authToken);

// Get All user 
exports.getAllusers = (req, res) => {
    userModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// // Get user 
exports.getSpecificuser = (req, res) => {
    const userId = req.params.userId;
    userModel.find({ _id: userId }, function (err, foundResult) {
        try {
            res.json({data:foundResult})
        } catch (err) {
            res.json(err)
        }
    })
}
// // Login 
exports.loginuser = (req, res) => {
    const findUser = {
        phone_no: req.body.phone_no
    }
    userModel.findOne(findUser, (error, result) => {
        if (error) {
            res.json(error)
        } else {
            if (result) {
                    const updateData = {
                        isLogin:true
                    }
                    const options = {
                        new: true
                    }
                    userModel.findByIdAndUpdate(result._id, updateData, options, (error, result) => {
                        if (error) {
                            res.json(error.message)
                        } else {
                            res.json({data:result,message:"Login Successfully"})
                        }
                    })

                
            } else {
                res.json({message:"Phone No Not Found"})
            }
        }
    })
}
// Update 
exports.logoutuser = async (req, res) => {
    const updateData = {
        isLogin:false
    }
    const options = {
        new: true
    }
    userModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({data:result,message:"Logout Successfully"})
        }
    })
}
// Forget Password Otp 
// exports.forgetPassworduser = async (req, res) => {
//     let data = await userModel.findOne({
//         email: req.body.email
//     });
//     const responseType = {};
//     responseType.data = data
//     console.log(data)
//     if (data) {
//         let otpcode = Math.floor((Math.random() * 10000) + 1);
//         let otpData = new forgetPasswordModel({
//             _id: mongoose.Types.ObjectId(),
//             email: req.body.email,
//             code: otpcode,
//             expiresIn: new Date().getTime() + 300 * 1000
//         })
//         let otpResponse = await otpData.save();
//         responseType.statusText = 'Success'
//         mailer(req.body.email, otpcode)
//         console.log(otpcode)
//         responseType.message = 'Please check Your Email Id';
//         responseType.otp = otpcode;
//     } else {
//         responseType.statusText = 'error'
//         responseType.message = 'Email Id not Exist';
//     }
//     res.status(200).json(responseType)
// }
// OTP TWILIO 
// const mailer = (email, otp) => {
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         port: 587,
//         secure: false,
//         auth: {
//             user: 'rimshanimo22@gmail.com',
//             pass: 'oespmdfxhmbhrxgd'
//         }
//     });
//     transporter.verify().then(console.log).catch(console.error);

//     // send mail with defined transport object
//     var mailOptions = {
//         from: 'rimshanimo22@gmail.com',
//         to: email,
//         subject: `OTP code is ` + otp,
//         text: `Email Verification :OTP code is ` + otp,

//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             // console.log('Email sent ' + info.response)
//         }
//     });
// }
// Delete 
exports.deleteuser = (req, res) => {
    const userId = req.params.userId;
    userModel.findByIdAndDelete(userId, (error, result) => {
        if (error) {
            res.send({message:error.message})
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createuser = async (req, res) => {
    userModel.find({ phone_no: req.body.phone_no }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                const user = new userModel({
                    _id: mongoose.Types.ObjectId(),
                    activity_status_id:req.body.activity_status_id,
                    username: req.body.username,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    phone_no: req.body.phone_no,
                    latest_verification_code:req.body.latest_verification_code,
                    bio:req.body.bio,
                    image:req.body.image,
                    online_status:req.body.online_status,
                    admin_block_status:req.body.admin_block_status,
                    created_at:req.body.created_at,
                    updated_at:req.body.updated_at,
                    privacy:req.body.privacy,
                    chatLists:[]
                
                });
                user.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.json({data:result,message:"Created Successfully"})
                    }
                })

            } else {
                res.json({data:result,message:"Phone No Already Exist"})

            }
        }
    })

}
exports.otpTwilio =async (req,res)=>{
    // if(req.body.toContact==="+96812345678" ||req.body.toContact==="+96823456781"||req.body.toContact==="+96834567812"||req.body.toContact==="+96845678123"){
    //     res.json({
    //         // data: message.sid,
    //         otp:"0000",
    //         message: "Message Send successfully"
    //     })
    // }else{
  let otpGenerator = Math.floor((Math.random() * 10000) + 1);
            const toContact = req.body.toContact
            client.messages
                .create({ body: `Verirification Otp :${otpGenerator}`, from: phoneNo, to: toContact })
                .then(message =>
                    res.json({
                        data: message.sid,
                        otp:otpGenerator,
                        message: "Message Send successfully"
                    })
                )
    // }
}
// Update 
exports.updateuser = async (req, res) => {
    const updateData = {
        activity_status_id:req.body.activity_status_id,
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_no: req.body.phone_no,
        latest_verification_code:req.body.latest_verification_code,
        bio:req.body.bio,
        image:req.body.image,
        online_status:req.body.online_status,
        admin_block_status:req.body.admin_block_status,
        created_at:req.body.created_at,
        updated_at:req.body.updated_at,
        privacy:req.body.privacy
    }
    const options = {
        new: true
    }
    userModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({data:result,message:"Updated Successfully"})
        }
    })
}



