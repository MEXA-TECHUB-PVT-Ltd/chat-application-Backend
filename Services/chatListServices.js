const chat_listModel = require("../models/chatListModel");
const mongoose = require("mongoose");

// Get All chat_list 
exports.getAllchat_lists = (req, res) => {
    chat_listModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 }).populate('users')
}
// // Get chat_list 
exports.getchat_list_by_userId = async(req, res) => {
    const userId = req.params.userId;
    const messages = await chat_listModel.find({
        users: {
          $all: [userId, userId],
        },
      }).sort({ updatedAt: 1 }).populate('users')
      const projectedMessages = messages.map((msg) => {
        return {
            ChatList:msg
        };
      });
      res.json(projectedMessages);
}
// get chatlist by userId 
exports.getSpecificchat_list = (req, res) => {
    const chat_listId = req.params.chat_listId;
    chat_listModel.find({ _id: chat_listId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    }).populate('users')
}
// Delete 
exports.deletechat_list = (req, res) => {
    const chat_listId = req.params.chat_listId;
    chat_listModel.findByIdAndDelete(chat_listId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createchat_list = async (req, res) => {
    chat_listModel.find({ chat_room: req.body.chat_room }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                const chat_list = new chat_listModel({
                    _id: mongoose.Types.ObjectId(),
                    chat_room: req.body.chat_room,
                    users: [req.body.firstUser, req.body.secondUser],
                    deleted_at: req.body.deleted_at,
                    is_deleted: req.body.is_deleted,


                });
                chat_list.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.json({ data: result, message: "Created Successfully" })
                        // Push To User Array ChatList


                    }
                })

            } else {
                res.json({ data: result, message: "SubType Already Exist" })

            }
        }
    })

}
// Update 
exports.updatechat_list = async (req, res) => {
    const updateData = {
        chat_room: req.body.chat_room,
        deleted_at: req.body.deleted_at,
        is_deleted: req.body.is_deleted,
    }
    const options = {
        new: true
    }
    chat_listModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



