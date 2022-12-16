const labelChatModel = require("../models/labeled_chatModel");
const mongoose = require("mongoose");
const labelModel = require("../models/labelModel");
const chatListModel = require("../models/chatListModel");

// Get All labelChat 
exports.getAlllabelChats = (req, res) => {
    labelChatModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
        .populate('chatlist_id')
        .populate('user_id')

}
// // Get labelChat 
exports.getSpecificlabelChat = (req, res) => {
    const labelChatId = req.params.labelChatId;
    labelChatModel.find({ _id: labelChatId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
        .populate('chatlist_id')
        .populate('user_id')
}
// Create /remove label 
exports.createlabelChat = async (req, res) => {
    // get label by user id 
    const userId = req.body.user_id;
    const labelId = req.body.label_id;
    const chatListId = req.body.chatlist_id;
    //  res.json(labelId[0])
    if (labelId.length === 0) {
        // console.log(labelId, "empty")
        chatListModel.find({ _id: chatListId }, (error, result) => {
            if (error) {
                res.send(error)
            } else {
                // res.json(result)

                if (result.length === 0) {
                    res.json({ messsage: 'no chat list find for thid id' })


                } else {

                    // res.json(result)
                    // console.log(result[0].extraAttribute[0].firstUser.label)
                    const firstUserId = result[0].extraAttribute[0].firstUser.userId
                    const firstUsername = result[0].extraAttribute[0].firstUser.chatName
                    const firstUserPinned = result[0].extraAttribute[0].firstUser.pinnedStatus
                    const firstUserBlocked = result[0].extraAttribute[0].firstUser.blockStatus
                    const firstArchievedStatus = result[0].extraAttribute[0].firstUser.archieved
                    const firstlabel = result[0].extraAttribute[0].firstUser.label

                    // const label

                    const secondUserId = result[0].extraAttribute[0].secondUser.userId
                    const secondUsername = result[0].extraAttribute[0].secondUser.chatName
                    const secondUserPinned = result[0].extraAttribute[0].secondUser.pinnedStatus
                    const secondUserBlocked = result[0].extraAttribute[0].secondUser.blockStatus
                    const secondArchievedStatus = result[0].extraAttribute[0].secondUser.archieved
                    const secondlabel = result[0].extraAttribute[0].secondUser.label

                    if (firstUserId == userId) {

                        // console.log('trus')
                        const updateData = {
                            extraAttribute: [
                                {
                                    firstUser: {
                                        userId: firstUserId,
                                        chatName: firstUsername,
                                        pinnedStatus: firstUserPinned,
                                        blockStatus: firstUserBlocked,
                                        archieved: firstArchievedStatus,
                                        label: firstlabel



                                    },
                                    secondUser: {
                                        userId: secondUserId,
                                        chatName: secondUsername,
                                        pinnedStatus: secondUserPinned,
                                        blockStatus: secondUserBlocked,
                                        archieved: secondArchievedStatus,
                                        label: []


                                    }
                                }
                            ]
                        }
                        const options = {
                            new: true
                        }
                        chatListModel.findByIdAndUpdate(chatListId, updateData, options, (error, result) => {
                            if (error) {
                                res.json(error.message)
                            } else {
                                res.send({ data: result, message: "Updated Successfully" })
                            }
                        })
                    } else {
                        // console.log('sfsdsdd')
                        const updateData = {
                            extraAttribute: [
                                {
                                    firstUser: {
                                        userId: firstUserId,
                                        chatName: firstUsername,
                                        pinnedStatus: firstUserPinned,
                                        blockStatus: firstUserBlocked,
                                        archieved: firstArchievedStatus,
                                        label: []



                                    },
                                    secondUser: {
                                        userId: secondUserId,
                                        chatName: secondUsername,
                                        pinnedStatus: secondUserPinned,
                                        blockStatus: secondUserBlocked,
                                        archieved: secondArchievedStatus,
                                        label: secondlabel


                                    }
                                }
                            ]
                        }
                        const options = {
                            new: true
                        }
                        chatListModel.findByIdAndUpdate(chatListId, updateData, options, (error, result) => {
                            if (error) {
                                res.json(error.message)
                            } else {
                                res.send({ data: result, message: "Updated Successfully" })
                            }
                        })
                    }
                    // End 

                }

            }
        }).sort({ $natural: -1 })
    } else {
        labelModel.find({
            user_id: userId,
            '_id': {
                $in: labelId
            }
        }, function (err, foundResult) {
            try {
                // res.json({ data: foundResult })
                if (foundResult.length === 0) {
                    res.json({ data: foundResult, message: 'no label created for this userid ' })

                } else {
                    let ArrayLabel = [];
                    // labels given by user 
                    ArrayLabel = foundResult
                    // Update count  

                    // console.log(foundResult)
                    for (let m = 0; m < foundResult.length; m++) {
                        const IdDATA = foundResult[m]._id;
                        const COUNT = foundResult[m].count;
                        // Count 
                        const updateData = {
                            // $push:{
                            //     chatList:foundResult[m]._id
                            // },
                            count: parseInt(COUNT) + parseInt(1),
                            

                        }
                        const options = {
                            new: true
                        }
                        labelModel.findByIdAndUpdate(IdDATA, updateData, options, (error, result) => {
                            if (error) {
                                res.json(error.message)
                            } else {
                                // Get Data 
                               console.log('usos')
                                // res.send({ data: result, message: "Updated Successfully" })
                            }
                        })
                    }
                    chatListModel.find({ _id: chatListId }, (error, result) => {
                        if (error) {
                            res.send(error)
                        } else {
                            // res.json(result)

                            if (result.length === 0) {
                                res.json({ messsage: 'no chat list find for thid id' })


                            } else {

                                // res.json(result)
                                // console.log(result[0].extraAttribute[0].firstUser.label)
                                const firstUserId = result[0].extraAttribute[0].firstUser.userId
                                const firstUsername = result[0].extraAttribute[0].firstUser.chatName
                                const firstUserPinned = result[0].extraAttribute[0].firstUser.pinnedStatus
                                const firstUserBlocked = result[0].extraAttribute[0].firstUser.blockStatus
                                const firstArchievedStatus = result[0].extraAttribute[0].firstUser.archieved
                                const firstlabel = result[0].extraAttribute[0].firstUser.label

                                // const label

                                const secondUserId = result[0].extraAttribute[0].secondUser.userId
                                const secondUsername = result[0].extraAttribute[0].secondUser.chatName
                                const secondUserPinned = result[0].extraAttribute[0].secondUser.pinnedStatus
                                const secondUserBlocked = result[0].extraAttribute[0].secondUser.blockStatus
                                const secondArchievedStatus = result[0].extraAttribute[0].secondUser.archieved
                                const secondlabel = result[0].extraAttribute[0].secondUser.label

                                if (firstUserId == userId) {

                                    // console.log('trus')
                                    const updateData = {
                                        extraAttribute: [
                                            {
                                                firstUser: {
                                                    userId: firstUserId,
                                                    chatName: firstUsername,
                                                    pinnedStatus: firstUserPinned,
                                                    blockStatus: firstUserBlocked,
                                                    archieved: firstArchievedStatus,
                                                    label: firstlabel



                                                },
                                                secondUser: {
                                                    userId: secondUserId,
                                                    chatName: secondUsername,
                                                    pinnedStatus: secondUserPinned,
                                                    blockStatus: secondUserBlocked,
                                                    archieved: secondArchievedStatus,
                                                    label: ArrayLabel


                                                }
                                            }
                                        ]
                                    }
                                    const options = {
                                        new: true
                                    }
                                    chatListModel.findByIdAndUpdate(chatListId, updateData, options, (error, result) => {
                                        if (error) {
                                            res.json(error.message)
                                        } else {
                                            res.send({ data: result, message: "Updated Successfully" })
                                        }
                                    })
                                } else {
                                    // console.log('sfsdsdd')
                                    const updateData = {
                                        extraAttribute: [
                                            {
                                                firstUser: {
                                                    userId: firstUserId,
                                                    chatName: firstUsername,
                                                    pinnedStatus: firstUserPinned,
                                                    blockStatus: firstUserBlocked,
                                                    archieved: firstArchievedStatus,
                                                    label: ArrayLabel



                                                },
                                                secondUser: {
                                                    userId: secondUserId,
                                                    chatName: secondUsername,
                                                    pinnedStatus: secondUserPinned,
                                                    blockStatus: secondUserBlocked,
                                                    archieved: secondArchievedStatus,
                                                    label: secondlabel


                                                }
                                            }
                                        ]
                                    }
                                    const options = {
                                        new: true
                                    }
                                    chatListModel.findByIdAndUpdate(chatListId, updateData, options, (error, result) => {
                                        if (error) {
                                            res.json(error.message)
                                        } else {
                                            res.send({ data: result, message: "Updated Successfully" })
                                        }
                                    })
                                }
                                // End 

                            }

                        }
                    }).sort({ $natural: -1 })


                }
            } catch (err) {
                res.json(err)
            }
        })
    }




}
// // Get All labelChat by userId
exports.getAllLabeledChatByUseId = (req, res) => {
    let Array = [];
    let ResultArray = [];
    let ChatListByUser = [];

    const UserId = req.params.user_id;
    labelModel.find({ user_id: UserId }, function (err, foundResult) {
        try {
            if (foundResult.length === 0) {
                res.json({ message: 'No Label for user ' })
            } else {
                // res.json({ message: ' Label for user ',data:foundResult })
                Array = foundResult
                // ChatList By user Id 
                chatListModel.find({
                    users: {
                        $all: [UserId, UserId],
                    }
                }, (error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        if (result) {
                            // res.json(result.length)
                            // const chatListLength=result.length
                            ChatListByUser = result
                            //  for (let i = 0; i < Array.length; i++) {
                            // let result = {
                            //             extraAttribute:'count',
                            //             ...foundResult
                            //         }
                            //         res.json(result)
                            // start 
                            let TempArray = [];

                            for (let j = 0; j < ChatListByUser.length; j++) {
                                console.log(j)
                                if (ChatListByUser[j].extraAttribute[j].firstUser.userId == UserId) {
                                    if (ChatListByUser[j].extraAttribute[j].secondUser.label.length === 0) {
                                        console.log('no label ')
                                        res.json(Array);

                                    } else {
                                        console.log("ChatListByUser[j].extraAttribute[j].secondUser.label")
                                        const tempData = ChatListByUser[j].extraAttribute[j].secondUser.label;
                                        console.log(tempData.length);
                                        TempArray.push(ChatListByUser[j])

                                        // for (let k = 0; k < tempData.length; k++) {
                                        //     TempArray.push(tempData[k])
                                        // }
                                        res.json(TempArray)

                                    }
                                    // console.log(ChatListByUser[j].extraAttribute[j].secondUser.label)
                                    // TempArray =ChatListByUser[j].extraAttribute[j].secondUser.label
                                    // TempArray.push(ChatListByUser[j].extraAttribute[j].secondUser.label);


                                    //         if (Array[i].extraAttribute[j].secondUser.archieved) {
                                    //             ResultArray.push(Array[i]);
                                    //         } else {
                                    //             console.log('empty')
                                    //         }
                                } else {
                                    if (ChatListByUser[j].extraAttribute[j].firstUser.label.length === 0) {
                                        console.log('no label ')
                                    } else {
                                        console.log("ChatListByUser[j].extraAttribute[j].firstUser.label")

                                    }
                                    //         if (Array[i].extraAttribute[j].firstUser.archieved) {
                                    //             ResultArray.push(Array[i]);
                                    //         } else {
                                    //             console.log('empty')
                                    //         }
                                }
                                // }
                            }


                            // end 
                            // console.log(TempArray)


                        } else {
                            console.log('no data in chatlist')
                        }

                    }
                }).sort({ $natural: -1 }).populate('users')



            }
            // res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
    // const labelChatId = req.params.labelChatId;
    // labelChatModel.find({ _id: labelChatId }, function (err, foundResult) {
    //     try {
    //         res.json({ data: foundResult })
    //     } catch (err) {
    //         res.json(err)
    //     }
    // })
    //     .populate('chatlist_id')
    //     .populate('user_id')
}
// Update 
exports.updatelabelChat = async (req, res) => {
    const updateData = {
        user_id: req.body.user_id,
        chatlist_id: req.body.chatlist_id,
        label_id: req.body.label_id

    }
    const options = {
        new: true
    }
    labelChatModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



