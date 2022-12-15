const chat_listModel = require("../models/chatListModel");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");

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
exports.getchat_list_by_userId = async (req, res) => {
    const userId = req.params.userId;

    let Array = [];
    chat_listModel.find({
        users: {
            $all: [userId, userId],
        }
    }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            if (result) {
                res.json(result)
                //     result = {
                //         extraAttribute: 1,
                //         ...result
                //     }
                //     res.json(result)

            } else {
                console.log('no data in chatlist')
            }

        }
    }).sort({ $natural: -1 }).populate('users')
}
// Get pinned chat of user by userId 
exports.get_pinnedchat_list_by_userId = async (req, res) => {
    const userId = req.params.userId;

    let Array = [];
    let ResultArray = [];

    chat_listModel.find({
        users: {
            $all: [userId, userId],
        }
    }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            if (result) {
                // res.json(result)
                Array = result
                console.log(result[0].extraAttribute[0])
                for (let i = 0; i < Array.length; i++) {
                    for (let j = 0; j < 1; j++) {
                        // console.log(j)
                        if (Array[i].extraAttribute[j].firstUser.userId == userId) {
                            if (Array[i].extraAttribute[j].secondUser.pinnedStatus) {
                                ResultArray.push(Array[i]);
                            } else {
                                console.log('empty')
                            }
                        } else {
                            if (Array[i].extraAttribute[j].firstUser.pinnedStatus) {
                                ResultArray.push(Array[i]);
                            } else {
                                console.log('empty')
                            }
                        }
                    }
                }
                res.json(ResultArray)

            } else {
                console.log('no data in chatlist')
            }

        }
    }).sort({ $natural: -1 })

}
// Get pinned chat of user by userId 
exports.get_blockedchat_list_by_userId = async (req, res) => {
    const userId = req.params.userId;

    let Array = [];
    let ResultArray = [];

    chat_listModel.find({
        users: {
            $all: [userId, userId],
        }
    }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            if (result) {
                // res.json(result)
                Array = result
                // console.log(result[0].extraAttribute[0])
                for (let i = 0; i < Array.length; i++) {
                    for (let j = 0; j < 1; j++) {
                        // console.log(j)
                        if (Array[i].extraAttribute[j].firstUser.userId == userId) {
                            if (Array[i].extraAttribute[j].secondUser.blockStatus) {
                                ResultArray.push(Array[i]);
                            } else {
                                console.log('empty')
                            }
                        } else {
                            if (Array[i].extraAttribute[j].firstUser.blockStatus) {
                                ResultArray.push(Array[i]);
                            } else {
                                console.log('empty')
                            }
                        }
                    }
                }
                res.json(ResultArray)

            } else {
                console.log('no data in chatlist')
            }

        }
    }).sort({ $natural: -1 })

}
// get chatlist by userId 
exports.getSpecificchat_list = (req, res) => {
    const chat_listId = req.params.chat_listId;
    chat_listModel.find({ _id: chat_listId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
            // console.log(foundResult[0])
            // if (foundResult) {
            //     let result = {
            //         extraAttribute: [{firstUser:{
            //             userId: foundResult[0].firstUser._id,
            //             chatName: foundResult[0].firstUser.phone_no
            //         },
            //         secondUser:{
            //                 userId: foundResult[0].secondUser._id,
            //                 chatName: foundResult[0].secondUser.phone_no
            //             }}],
            //         ...foundResult
            //     }
            //     res.json(result)
            // }
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
    userModel.find({
        '_id': {
            $in: [
                mongoose.Types.ObjectId(req.body.firstUser),
                mongoose.Types.ObjectId(req.body.secondUser),
            ]
        }
    }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result[0])
            const firstUser = result[0]._id
            const firstUserPhoneNo = result[0].phone_no
            const secondUser = result[1]._id
            const secondUserPhoneNo = result[1].phone_no

            // var friend = { firstUser: 'Harry', lastName: 'Potter' };
            const chat_list = new chat_listModel({
                _id: mongoose.Types.ObjectId(),
                // chat_room: req.body.chat_room,
                // firstUser: req.body.firstUser,
                // secondUser: req.body.secondUser,
                users: [req.body.firstUser, req.body.secondUser],
                deleted_at: req.body.deleted_at,
                is_deleted: req.body.is_deleted,
                extraAttribute: [
                    {
                        firstUser: {
                            userId: firstUser,
                            chatName: firstUserPhoneNo,
                            pinnedStatus: false,
                            blockStatus: false,
                            archieved: false,
                            label:[]
                        },
                        secondUser: {
                            userId: secondUser,
                            chatName: secondUserPhoneNo,
                            pinnedStatus: false,
                            blockStatus: false,
                            archieved: false,
                            label:[]




                        }
                    }
                ],


            });
            chat_list.save((error, result) => {
                if (error) {
                    res.send(error)
                } else {

                    res.json({ data: result, message: "Created Successfully" })
                    // Push To User Array ChatList
                    // }

                }
            })
        }
    })

}
// Update Name Chat List 
exports.updatechat_list = async (req, res) => {
    const EditedBy = req.body.edited_by;
    const nameEdit = req.body.name_edit;
    const chatListId = req.body._id;

    // console.log(nameEdit)
    chat_listModel.find({ _id: chatListId }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result[0].extraAttribute)
            const firstUserId = result[0].extraAttribute[0].firstUser.userId
            const firstUsername = result[0].extraAttribute[0].firstUser.chatName
            const firstUserPinned = result[0].extraAttribute[0].firstUser.pinnedStatus
            const firstUserBlocked = result[0].extraAttribute[0].firstUser.blockStatus
            const firstArchievedStatus = result[0].extraAttribute[0].firstUser.archieved
            const firstlabel = result[0].extraAttribute[0].firstUser.label

            const secondUserId = result[0].extraAttribute[0].secondUser.userId
            const secondUsername = result[0].extraAttribute[0].secondUser.chatName
            const secondUserPinned = result[0].extraAttribute[0].secondUser.pinnedStatus
            const secondUserBlocked = result[0].extraAttribute[0].secondUser.blockStatus
            const secondArchievedStatus = result[0].extraAttribute[0].secondUser.archieved
            const secondlabel = result[0].extraAttribute[0].secondUser.label


            if (firstUserId == EditedBy) {

                console.log('trus')
                const updateData = {
                    extraAttribute: [
                        {
                            firstUser: {
                                userId: firstUserId,
                                chatName: firstUsername,
                                pinnedStatus: firstUserPinned,
                                blockStatus: firstUserBlocked,
                                archieved: firstArchievedStatus,
                                label:firstlabel


                            },
                            secondUser: {
                                userId: secondUserId,
                                chatName: nameEdit,
                                pinnedStatus: secondUserPinned,
                                blockStatus: secondUserBlocked,
                                archieved: secondArchievedStatus,
                                label:secondlabel



                            }
                        }
                    ]
                }
                const options = {
                    new: true
                }
                chat_listModel.findByIdAndUpdate(chatListId, updateData, options, (error, result) => {
                    if (error) {
                        res.json(error.message)
                    } else {
                        res.send({ data: result, message: "Updated Successfully" })
                    }
                })
            } else {
                console.log('sfsdsdd')
                const updateData = {
                    extraAttribute: [
                        {
                            firstUser: {
                                userId: firstUserId,
                                chatName: nameEdit,
                                pinnedStatus: firstUserPinned,
                                blockStatus: firstUserBlocked,
                                archieved: firstArchievedStatus,
                                label:firstlabel



                            },
                            secondUser: {
                                userId: secondUserId,
                                chatName: secondUsername,
                                pinnedStatus: secondUserPinned,
                                blockStatus: secondUserBlocked,
                                archieved: secondArchievedStatus,
                                label:secondlabel

                            }
                        }
                    ]
                }
                const options = {
                    new: true
                }
                chat_listModel.findByIdAndUpdate(chatListId, updateData, options, (error, result) => {
                    if (error) {
                        res.json(error.message)
                    } else {
                        res.send({ data: result, message: "Updated Successfully" })
                    }
                })
            }
        }
    })
}
// Pinned Chat Module 
exports.updatechat_listPinned = async (req, res) => {
    const EditedBy = req.body.edited_by;
    const chatListId = req.body._id;

    // console.log(nameEdit)
    chat_listModel.find({ _id: chatListId }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result[0].extraAttribute)
            const firstUserId = result[0].extraAttribute[0].firstUser.userId
            const firstUsername = result[0].extraAttribute[0].firstUser.chatName
            const firstUserPinned = result[0].extraAttribute[0].firstUser.pinnedStatus
            const firstUserBlocked = result[0].extraAttribute[0].firstUser.blockStatus
            const firstArchievedStatus = result[0].extraAttribute[0].firstUser.archieved
            const firstlabel = result[0].extraAttribute[0].firstUser.label


            const secondUserId = result[0].extraAttribute[0].secondUser.userId
            const secondUsername = result[0].extraAttribute[0].secondUser.chatName
            const secondUserPinned = result[0].extraAttribute[0].secondUser.pinnedStatus
            const secondUserBlocked = result[0].extraAttribute[0].secondUser.blockStatus
            const secondArchievedStatus = result[0].extraAttribute[0].secondUser.archieved
            const secondlabel = result[0].extraAttribute[0].secondUser.label


            if (firstUserId == EditedBy) {

                console.log('trus')
                const updateData = {
                    extraAttribute: [
                        {
                            firstUser: {
                                userId: firstUserId,
                                chatName: firstUsername,
                                pinnedStatus: firstUserPinned,
                                blockStatus: firstUserBlocked,
                                archieved: firstArchievedStatus,
                                label:firstlabel


                            },
                            secondUser: {
                                userId: secondUserId,
                                chatName: secondUsername,
                                pinnedStatus: true,
                                blockStatus: secondUserBlocked,
                                archieved: secondArchievedStatus,
                                label:secondlabel




                            }
                        }
                    ]
                }
                const options = {
                    new: true
                }
                chat_listModel.findByIdAndUpdate(chatListId, updateData, options, (error, result) => {
                    if (error) {
                        res.json(error.message)
                    } else {
                        res.send({ data: result, message: "Updated Successfully" })
                    }
                })
            } else {
                console.log('sfsdsdd')
                const updateData = {
                    extraAttribute: [
                        {
                            firstUser: {
                                userId: firstUserId,
                                chatName: firstUsername,
                                pinnedStatus: true,
                                blockStatus: firstUserBlocked,
                                archieved: firstArchievedStatus,
                                label:firstlabel




                            },
                            secondUser: {
                                userId: secondUserId,
                                chatName: secondUsername,
                                pinnedStatus: secondUserPinned,
                                blockStatus: secondUserBlocked,
                                archieved: secondArchievedStatus,
                                label:secondlabel




                            }
                        }
                    ]
                }
                const options = {
                    new: true
                }
                chat_listModel.findByIdAndUpdate(chatListId, updateData, options, (error, result) => {
                    if (error) {
                        res.json(error.message)
                    } else {
                        res.send({ data: result, message: "Updated Successfully" })
                    }
                })
            }
        }
    })

}

// Unpinned Chat Module 
// Update 
exports.updatechat_listUnPinned = async (req, res) => {
    const EditedBy = req.body.edited_by;
    const chatListId = req.body._id;
    // console.log(nameEdit)
    chat_listModel.find({ _id: chatListId }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result[0].extraAttribute)
            const firstUserId = result[0].extraAttribute[0].firstUser.userId
            const firstUsername = result[0].extraAttribute[0].firstUser.chatName
            const firstUserPinned = result[0].extraAttribute[0].firstUser.pinnedStatus
            const firstUserBlocked = result[0].extraAttribute[0].firstUser.blockStatus
            const firstArchievedStatus = result[0].extraAttribute[0].firstUser.archieved
            const firstlabel = result[0].extraAttribute[0].firstUser.label


            const secondUserId = result[0].extraAttribute[0].secondUser.userId
            const secondUsername = result[0].extraAttribute[0].secondUser.chatName
            const secondUserPinned = result[0].extraAttribute[0].secondUser.pinnedStatus
            const secondUserBlocked = result[0].extraAttribute[0].secondUser.blockStatus
            const secondArchievedStatus = result[0].extraAttribute[0].secondUser.archieved
            const secondlabel = result[0].extraAttribute[0].secondUser.label

            if (firstUserId == EditedBy) {

                console.log('trus')
                const updateData = {
                    extraAttribute: [
                        {
                            firstUser: {
                                userId: firstUserId,
                                chatName: firstUsername,
                                pinnedStatus: firstUserPinned,
                                blockStatus: firstUserBlocked,
                                archieved: firstArchievedStatus,
                                label:firstlabel


                            },
                            secondUser: {
                                userId: secondUserId,
                                chatName: secondUsername,
                                pinnedStatus: false,
                                blockStatus: secondUserBlocked,
                                archieved: secondArchievedStatus,
                                label:secondlabel



                            }
                        }
                    ]
                }
                const options = {
                    new: true
                }
                chat_listModel.findByIdAndUpdate(chatListId, updateData, options, (error, result) => {
                    if (error) {
                        res.json(error.message)
                    } else {
                        res.send({ data: result, message: "Updated Successfully" })
                    }
                })
            } else {
                console.log('sfsdsdd')
                const updateData = {
                    extraAttribute: [
                        {
                            firstUser: {
                                userId: firstUserId,
                                chatName: firstUsername,
                                pinnedStatus: false,
                                blockStatus: firstUserBlocked,
                                archieved: firstArchievedStatus,
                                label:firstlabel



                            },
                            secondUser: {
                                userId: secondUserId,
                                chatName: secondUsername,
                                pinnedStatus: secondUserPinned,
                                blockStatus: secondUserBlocked,
                                archieved: secondArchievedStatus,
                                label:secondlabel




                            }
                        }
                    ]
                }
                const options = {
                    new: true
                }
                chat_listModel.findByIdAndUpdate(chatListId, updateData, options, (error, result) => {
                    if (error) {
                        res.json(error.message)
                    } else {
                        res.send({ data: result, message: "Updated Successfully" })
                    }
                })
            }
        }
    })

}
// Blocked user 
exports.updatechat_listBlocked = async (req, res) => {
    const EditedBy = req.body.blocked_by;
    const chatListId = req.body._id;

    // console.log(nameEdit)
    chat_listModel.find({ _id: chatListId }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result[0].extraAttribute)
            const firstUserId = result[0].extraAttribute[0].firstUser.userId
            const firstUsername = result[0].extraAttribute[0].firstUser.chatName
            const firstUserPinned = result[0].extraAttribute[0].firstUser.pinnedStatus
            const firstUserBlocked = result[0].extraAttribute[0].firstUser.blockStatus
            const firstArchievedStatus = result[0].extraAttribute[0].firstUser.archieved
            const firstlabel = result[0].extraAttribute[0].firstUser.label


            const secondUserId = result[0].extraAttribute[0].secondUser.userId
            const secondUsername = result[0].extraAttribute[0].secondUser.chatName
            const secondUserPinned = result[0].extraAttribute[0].secondUser.pinnedStatus
            const secondUserBlocked = result[0].extraAttribute[0].secondUser.blockStatus
            const secondArchievedStatus = result[0].extraAttribute[0].secondUser.archieved
            const secondlabel = result[0].extraAttribute[0].secondUser.label


            if (firstUserId == EditedBy) {

                console.log('trus')
                const updateData = {
                    extraAttribute: [
                        {
                            firstUser: {
                                userId: firstUserId,
                                chatName: firstUsername,
                                pinnedStatus: firstUserPinned,
                                blockStatus: firstUserBlocked,
                                archieved: firstArchievedStatus,
                                label:firstlabel


                            },
                            secondUser: {
                                userId: secondUserId,
                                chatName: secondUsername,
                                pinnedStatus: secondUserPinned,
                                blockStatus: true,
                                archieved: secondArchievedStatus,
                                label:secondlabel




                            }
                        }
                    ]
                }
                const options = {
                    new: true
                }
                chat_listModel.findByIdAndUpdate(chatListId, updateData, options, (error, result) => {
                    if (error) {
                        res.json(error.message)
                    } else {
                        res.send({ data: result, message: "Updated Successfully" })
                    }
                })
            } else {
                console.log('sfsdsdd')
                const updateData = {
                    extraAttribute: [
                        {
                            firstUser: {
                                userId: firstUserId,
                                chatName: firstUsername,
                                pinnedStatus: firstUserPinned,
                                blockStatus: true,
                                archieved: firstArchievedStatus,
                                label:firstlabel




                            },
                            secondUser: {
                                userId: secondUserId,
                                chatName: secondUsername,
                                pinnedStatus: secondUserPinned,
                                blockStatus: secondUserBlocked,
                                archieved: secondArchievedStatus,
                                label:secondlabel




                            }
                        }
                    ]
                }
                const options = {
                    new: true
                }
                chat_listModel.findByIdAndUpdate(chatListId, updateData, options, (error, result) => {
                    if (error) {
                        res.json(error.message)
                    } else {
                        res.send({ data: result, message: "Updated Successfully" })
                    }
                })
            }
        }
    })

}
// Unblock Chat Module 
// Update 
exports.updatechat_listUnBlock = async (req, res) => {
    const EditedBy = req.body.unblocked_by;
    const chatListId = req.body._id;
    // console.log(nameEdit)
    chat_listModel.find({ _id: chatListId }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result[0].extraAttribute)
            const firstUserId = result[0].extraAttribute[0].firstUser.userId
            const firstUsername = result[0].extraAttribute[0].firstUser.chatName
            const firstUserPinned = result[0].extraAttribute[0].firstUser.pinnedStatus
            const firstUserBlocked = result[0].extraAttribute[0].firstUser.blockStatus
            const firstArchievedStatus = result[0].extraAttribute[0].firstUser.archieved
            const firstlabel = result[0].extraAttribute[0].firstUser.label


            const secondUserId = result[0].extraAttribute[0].secondUser.userId
            const secondUsername = result[0].extraAttribute[0].secondUser.chatName
            const secondUserPinned = result[0].extraAttribute[0].secondUser.pinnedStatus
            const secondUserBlocked = result[0].extraAttribute[0].secondUser.blockStatus
            const secondArchievedStatus = result[0].extraAttribute[0].secondUser.archieved
            const secondlabel = result[0].extraAttribute[0].secondUser.label

            if (firstUserId == EditedBy) {

                console.log('trus')
                const updateData = {
                    extraAttribute: [
                        {
                            firstUser: {
                                userId: firstUserId,
                                chatName: firstUsername,
                                pinnedStatus: firstUserPinned,
                                blockStatus: firstUserBlocked,
                                archieved: firstArchievedStatus,
                                label:firstlabel


                            },
                            secondUser: {
                                userId: secondUserId,
                                chatName: secondUsername,
                                pinnedStatus: secondUserPinned,
                                blockStatus: false,
                                archieved: secondArchievedStatus,
                                label:secondlabel



                            }
                        }
                    ]
                }
                const options = {
                    new: true
                }
                chat_listModel.findByIdAndUpdate(chatListId, updateData, options, (error, result) => {
                    if (error) {
                        res.json(error.message)
                    } else {
                        res.send({ data: result, message: "Updated Successfully" })
                    }
                })
            } else {
                console.log('sfsdsdd')
                const updateData = {
                    extraAttribute: [
                        {
                            firstUser: {
                                userId: firstUserId,
                                chatName: firstUsername,
                                pinnedStatus: firstUserPinned,
                                blockStatus: false,
                                archieved: firstArchievedStatus,
                                label:firstlabel



                            },
                            secondUser: {
                                userId: secondUserId,
                                chatName: secondUsername,
                                pinnedStatus: secondUserPinned,
                                blockStatus: secondUserBlocked,
                                archieved: secondArchievedStatus,
                                label:secondlabel




                            }
                        }
                    ]
                }
                const options = {
                    new: true
                }
                chat_listModel.findByIdAndUpdate(chatListId, updateData, options, (error, result) => {
                    if (error) {
                        res.json(error.message)
                    } else {
                        res.send({ data: result, message: "Updated Successfully" })
                    }
                })
            }
        }
    })

}
// Archieved Chat 
exports.updatechat_listArchieved = async (req, res) => {
    const EditedBy = req.body.archieved_by;
    const chatListId = req.body._id;

    // console.log(nameEdit)
    chat_listModel.find({ _id: chatListId }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result[0].extraAttribute)
            const firstUserId = result[0].extraAttribute[0].firstUser.userId
            const firstUsername = result[0].extraAttribute[0].firstUser.chatName
            const firstUserPinned = result[0].extraAttribute[0].firstUser.pinnedStatus
            const firstUserBlocked = result[0].extraAttribute[0].firstUser.blockStatus
            const firstArchievedStatus = result[0].extraAttribute[0].firstUser.archieved
            const firstlabel = result[0].extraAttribute[0].firstUser.label


            const secondUserId = result[0].extraAttribute[0].secondUser.userId
            const secondUsername = result[0].extraAttribute[0].secondUser.chatName
            const secondUserPinned = result[0].extraAttribute[0].secondUser.pinnedStatus
            const secondUserBlocked = result[0].extraAttribute[0].secondUser.blockStatus
            const secondArchievedStatus = result[0].extraAttribute[0].secondUser.archieved
            const secondlabel = result[0].extraAttribute[0].secondUser.label


            if (firstUserId == EditedBy) {

                console.log('trus')
                const updateData = {
                    extraAttribute: [
                        {
                            firstUser: {
                                userId: firstUserId,
                                chatName: firstUsername,
                                pinnedStatus: firstUserPinned,
                                blockStatus: firstUserBlocked,
                                archieved: firstArchievedStatus,
                                label:firstlabel


                            },
                            secondUser: {
                                userId: secondUserId,
                                chatName: secondUsername,
                                pinnedStatus: secondUserPinned,
                                blockStatus: secondUserBlocked,
                                archieved: true,
                                label:secondlabel




                            }
                        }
                    ]
                }
                const options = {
                    new: true
                }
                chat_listModel.findByIdAndUpdate(chatListId, updateData, options, (error, result) => {
                    if (error) {
                        res.json(error.message)
                    } else {
                        res.send({ data: result, message: "Updated Successfully" })
                    }
                })
            } else {
                console.log('sfsdsdd')
                const updateData = {
                    extraAttribute: [
                        {
                            firstUser: {
                                userId: firstUserId,
                                chatName: firstUsername,
                                pinnedStatus: firstUserPinned,
                                blockStatus: firstUserBlocked,
                                archieved: true,
                                label:firstlabel




                            },
                            secondUser: {
                                userId: secondUserId,
                                chatName: secondUsername,
                                pinnedStatus: secondUserPinned,
                                blockStatus: secondUserBlocked,
                                archieved: secondArchievedStatus,
                                label:secondlabel




                            }
                        }
                    ]
                }
                const options = {
                    new: true
                }
                chat_listModel.findByIdAndUpdate(chatListId, updateData, options, (error, result) => {
                    if (error) {
                        res.json(error.message)
                    } else {
                        res.send({ data: result, message: "Updated Successfully" })
                    }
                })
            }
        }
    })

}
// UnarchievedChat 
exports.updatechat_listUnArchieved = async (req, res) => {
    const EditedBy = req.body.unarchieved_by;
    const chatListId = req.body._id;
    // console.log(nameEdit)
    chat_listModel.find({ _id: chatListId }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result[0].extraAttribute)
            const firstUserId = result[0].extraAttribute[0].firstUser.userId
            const firstUsername = result[0].extraAttribute[0].firstUser.chatName
            const firstUserPinned = result[0].extraAttribute[0].firstUser.pinnedStatus
            const firstUserBlocked = result[0].extraAttribute[0].firstUser.blockStatus
            const firstArchievedStatus = result[0].extraAttribute[0].firstUser.archieved
            const firstlabel = result[0].extraAttribute[0].firstUser.label


            const secondUserId = result[0].extraAttribute[0].secondUser.userId
            const secondUsername = result[0].extraAttribute[0].secondUser.chatName
            const secondUserPinned = result[0].extraAttribute[0].secondUser.pinnedStatus
            const secondUserBlocked = result[0].extraAttribute[0].secondUser.blockStatus
            const secondArchievedStatus = result[0].extraAttribute[0].secondUser.archieved
            const secondlabel = result[0].extraAttribute[0].secondUser.label

            if (firstUserId == EditedBy) {

                console.log('trus')
                const updateData = {
                    extraAttribute: [
                        {
                            firstUser: {
                                userId: firstUserId,
                                chatName: firstUsername,
                                pinnedStatus: firstUserPinned,
                                blockStatus: firstUserBlocked,
                                archieved: firstArchievedStatus,
                                label:firstlabel



                            },
                            secondUser: {
                                userId: secondUserId,
                                chatName: secondUsername,
                                pinnedStatus: secondUserPinned,
                                blockStatus: secondUserBlocked,
                                archieved: false,
                                label:secondlabel



                            }
                        }
                    ]
                }
                const options = {
                    new: true
                }
                chat_listModel.findByIdAndUpdate(chatListId, updateData, options, (error, result) => {
                    if (error) {
                        res.json(error.message)
                    } else {
                        res.send({ data: result, message: "Updated Successfully" })
                    }
                })
            } else {
                console.log('sfsdsdd')
                const updateData = {
                    extraAttribute: [
                        {
                            firstUser: {
                                userId: firstUserId,
                                chatName: firstUsername,
                                pinnedStatus: firstUserPinned,
                                blockStatus: firstUserBlocked,
                                archieved: false,
                                label:firstlabel



                            },
                            secondUser: {
                                userId: secondUserId,
                                chatName: secondUsername,
                                pinnedStatus: secondUserPinned,
                                blockStatus: secondUserBlocked,
                                archieved: secondArchievedStatus,
                                label:secondlabel




                            }
                        }
                    ]
                }
                const options = {
                    new: true
                }
                chat_listModel.findByIdAndUpdate(chatListId, updateData, options, (error, result) => {
                    if (error) {
                        res.json(error.message)
                    } else {
                        res.send({ data: result, message: "Updated Successfully" })
                    }
                })
            }
        }
    })

}
// All archieved Chat by user Id 
exports.get_archievedchat_list_by_userId = async (req, res) => {
    const userId = req.params.userId;

    let Array = [];
    let ResultArray = [];

    chat_listModel.find({
        users: {
            $all: [userId, userId],
        }
    }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            if (result) {
                // res.json(result)
                Array = result
                console.log(result[0].extraAttribute[0])
                for (let i = 0; i < Array.length; i++) {
                    for (let j = 0; j < 1; j++) {
                        // console.log(j)
                        if (Array[i].extraAttribute[j].firstUser.userId == userId) {
                            if (Array[i].extraAttribute[j].secondUser.archieved) {
                                ResultArray.push(Array[i]);
                            } else {
                                console.log('empty')
                            }
                        } else {
                            if (Array[i].extraAttribute[j].firstUser.archieved) {
                                ResultArray.push(Array[i]);
                            } else {
                                console.log('empty')
                            }
                        }
                    }
                }
                res.json(ResultArray)

            } else {
                console.log('no data in chatlist')
            }

        }
    }).sort({ $natural: -1 })

}





