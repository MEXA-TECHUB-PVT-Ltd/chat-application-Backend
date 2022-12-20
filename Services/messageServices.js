const Messages = require("../models/messageModel");
// Get Messages 
module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 }).populate('message_status_id').populate('message_type_id')
      .populate('chatlist_id')

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender_id === from,
        message_id: msg._id,
        Message: [msg],
        // message: msg.message.text,
        // message_status_id: msg.message_status_id.name,
        // message_type_name: msg.message_type_id.name,
        // message_type_one_type: msg.message_type_id.is_one_time,
        // message_subtype_name: msg.message_subtype_id.name,
        // message_subtype_thumbnail: msg.message_subtype_id.thumbnail,
        // is_deleted: msg.is_deleted,
        // createdAt: msg.createdAt,
        // deleted_at: msg.deleted_at,
        // chatList_id: msg.chatlist_id,
        // staredStatus: msg.staredStatus,
        // staredBy: msg.staredBy,
        // repliedStatus:msg.repliedStatus,
        // repliedMsgId:msg.repliedMsgId


      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};
// Get stared Msgs by UserId 
module.exports.getStaredMessagesByUserId = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const messages = await Messages.find({
      staredBy: userId,
      stredStatus: true
    }).sort({ updatedAt: 1 }).populate('message_status_id').populate('message_type_id').populate("sender_id")
    res.json(messages)

  } catch (ex) {
    next(ex);
  }
};
// Get single msg 
module.exports.getSingleMessage = async (req, res, next) => {
  try {
    const { message_id } = req.body;

    const messages = await Messages.find({
      _id: message_id
    }).sort({ updatedAt: 1 })
      .populate('message_status_id')
      .populate('message_type_id')
      
      .populate('chatlist_id')


    const projectedMessages = messages.map((msg) => {
      return {
        // fromSelf: msg.sender_id === from,
        message_id: msg._id,
        Message: [msg],
        // message: msg.message.text,
        // message_status_id: msg.message_status_id.name,
        // message_type_name: msg.message_type_id.name,
        // message_type_one_type: msg.message_type_id.is_one_time,
        // message_subtype_name: msg.message_subtype_id.name,
        // message_subtype_thumbnail: msg.message_subtype_id.thumbnail,
        // is_deleted: msg.is_deleted,
        // createdAt: msg.createdAt,
        // deleted_at: msg.deleted_at,
        // chatList_id: msg.chatlist_id,
        // staredStatus: msg.staredStatus,
        // staredBy: msg.staredBy,
        // repliedStatus:msg.repliedStatus,
        // repliedMsgId:msg.repliedMsgId


      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};
module.exports.staredMessages = async (req, res, next) => {
  try {

    const updateData = {
      staredStatus: req.body.staredStatus,
      staredBy: req.body.staredBy

    }
    const options = {
      new: true
    }
    Messages.findByIdAndUpdate(req.body.messageId, updateData, options, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send({ data: result, message: 'Updated Successfully' })
      }
    })


  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message, chatlist_id, message_status_id,
      imageType,VideoType,

       message_type_id,
      files,
      locationLat,
      locationLong,
      locationAddress,
      userImagePointer,
      ContactNo,
      ContactName,
      ContactImage,
      //  message_subtype_id, 
       created_at, updated_at, repliedStatus,
      repliedMsgId, readTime, deliveredTime, isForwarded,
      deleted_at, is_deleted ,is_one_time,
      message_type_name,docType} = req.body;
      // console.log(files)
      if(message_type_name==='Text'){
      const data = await Messages.create({
        message: { text: message },
        users: [from, to],
        chatlist_id: chatlist_id,
        sender_id: from,
        message_status_id: message_status_id,
        message_type_name:message_type_name,
        message_type_id: message_type_id,
        // message_subtype_id: message_subtype_id,
        created_at: created_at,
        updated_at: updated_at,
        deleted_at: deleted_at,
        staredStatus: false,
        repliedStatus: repliedStatus,
        repliedMsgId: repliedMsgId,
        is_deleted: is_deleted,
        readTime: readTime,
        deliveredTime: deliveredTime,
        isForwarded: isForwarded,
        is_one_time:is_one_time
  
      });
  
      if (data) return res.json({ data: data, message: "Message Added successfully" });
  
      else return res.json({ msg: "Failed to add message to the database" });
      }else if(message_type_name==='Document'){
        var array = files.split(',');
        console.log(array)
      const data = await Messages.create({
        message: { text: message },
        files:array,
        docType:docType,
        users: [from, to],
        chatlist_id: chatlist_id,
        sender_id: from,
        message_status_id: message_status_id,
        message_type_id: message_type_id,
        // message_subtype_id: message_subtype_id,
        message_type_name:message_type_name,
        created_at: created_at,
        updated_at: updated_at,
        deleted_at: deleted_at,
        staredStatus: false,
        repliedStatus: repliedStatus,
        repliedMsgId: repliedMsgId,
        is_deleted: is_deleted,
        readTime: readTime,
        deliveredTime: deliveredTime,
        isForwarded: isForwarded,
        is_one_time:is_one_time
  
      });
  
      if (data) return res.json({ data: data, message: "Message Added successfully" });
  
      else return res.json({ msg: "Failed to add message to the database" });
      }else if(message_type_name==='Images'||message_type_name==='Videos'||message_type_name==='Audio'){
        var array = files.split(',');
        console.log(array)
      const data = await Messages.create({
        message: { text: message },
        files:array,
        users: [from, to],
        chatlist_id: chatlist_id,
        sender_id: from,
        message_status_id: message_status_id,
        message_type_id: message_type_id,
        imageType:imageType,
        VideoType:VideoType,
        // message_subtype_id: message_subtype_id,
        message_type_name:message_type_name,
        created_at: created_at,
        updated_at: updated_at,
        deleted_at: deleted_at,
        staredStatus: false,
        repliedStatus: repliedStatus,
        repliedMsgId: repliedMsgId,
        is_deleted: is_deleted,
        readTime: readTime,
        deliveredTime: deliveredTime,
        isForwarded: isForwarded,
        is_one_time:is_one_time
  
      });
  
      if (data) return res.json({ data: data, message: "Message Added successfully" });
  
      else return res.json({ msg: "Failed to add message to the database" });
      }else if(message_type_name==='Location'){
        // var array = files.split(',');
        // console.log(array)
      const data = await Messages.create({
        message: { text: message },
        // files:array,
        locationLat:locationLat,
        locationLong:locationLong,
        locationAddress:locationAddress,
        userImagePointer:userImagePointer,

        users: [from, to],
        chatlist_id: chatlist_id,
        sender_id: from,
        message_status_id: message_status_id,
        message_type_id: message_type_id,
        // message_subtype_id: message_subtype_id,
        message_type_name:message_type_name,
        created_at: created_at,
        updated_at: updated_at,
        deleted_at: deleted_at,
        staredStatus: false,
        repliedStatus: repliedStatus,
        repliedMsgId: repliedMsgId,
        is_deleted: is_deleted,
        readTime: readTime,
        deliveredTime: deliveredTime,
        isForwarded: isForwarded,
        is_one_time:is_one_time
  
      });
  
      if (data) return res.json({ data: data, message: "Message Added successfully" });
  
      else return res.json({ msg: "Failed to add message to the database" });
      }else if(message_type_name==='Contact'){
        // var array = files.split(',');
        // console.log(array)
      const data = await Messages.create({
        message: { text: message },
        // files:array,
        ContactNo:ContactNo,
        ContactName:ContactName,
        ContactImage:ContactImage,
        users: [from, to],
        chatlist_id: chatlist_id,
        sender_id: from,
        message_status_id: message_status_id,
        message_type_id: message_type_id,
        // message_subtype_id: message_subtype_id,
        message_type_name:message_type_name,
        created_at: created_at,
        updated_at: updated_at,
        deleted_at: deleted_at,
        staredStatus: false,
        repliedStatus: repliedStatus,
        repliedMsgId: repliedMsgId,
        is_deleted: is_deleted,
        readTime: readTime,
        deliveredTime: deliveredTime,
        isForwarded: isForwarded,
        is_one_time:is_one_time
  
      });
  
      if (data) return res.json({ data: data, message: "Message Added successfully" });
  
      else return res.json({ msg: "Failed to add message to the database" });
      }else{
        res.json({message:"Failed to add msg check msg type name "})
      }
     
  } catch (ex) {
    next(ex);
  }
}
// Update Read and delivered Time 
module.exports.ReadTimeAndDeliveredMessages = async (req, res, next) => {
  try {
    const updateData = {
      readTime: req.body.readTime,
      deliveredTime: req.body.deliveredTime,
      message_status_id: req.body.message_status_id

    }
    const options = {
      new: true
    }
    Messages.findByIdAndUpdate(req.body.message_id, updateData, options, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send({ data: result, message: 'Updated Successfully' })
      }
    })


  } catch (ex) {
    next(ex);
  }
};
module.exports.DeletBulkOfMsgs = async (req, res, next) => {
  const msgIds = req.body.msg_ids;
  if (msgIds.length === 0) {
    console.log(msgIds, "empty")

  } else {
    console.log(msgIds, "not empty ")
    Messages.deleteMany({
      '_id': {
        $in: msgIds
      }
    }, function (err, foundResult) {
      try {
        res.json({ data: foundResult, message: "Deleted Succesfully" })
      } catch (err) {
        res.json(err)
      }
    })

  }
}
module.exports.GetAllMsgsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [userId, userId],
      },
    }).sort({ updatedAt: 1 }).populate('message_status_id').populate('message_type_id').populate("sender_id")
    res.json(messages)

  } catch (ex) {
    next(ex);
  }
}
// FilterAllChatByUserId
module.exports.FilterAllChatByUserId = async (req, res, next) => {
  try {
    const UserId = req.body.userId;
    const text_search = req.body.message
    Messages.find({
      "message.text": { $regex: text_search, $options: 'i' }
      ,  users: {
        $all: [UserId, UserId],
      },
    },
      function (err, result) {
        if (err) { return handleError(err); } else {
          res.json(result);

        }

      }).populate('chatlist_id')
      .populate('sender_id')
      .populate('message_status_id')
      .populate('message_type_id')
      
    // let ArrayCond = [];
    // ArrayCond = await Messages.aggregate([
    //   {
    //     $match: {
    //       "message.text": {
    //         $regex: text_search,
    //         "$options": "i"
    //       },
    //       users: {
    //         $all: [UserId, UserId],
    //       },

    //     }
    //   }

    // ])
    // return res.json(ArrayCond)

  } catch (ex) {
    next(ex);
  }
}
// FilterAllChatByUserId-single 
module.exports.FilterSingleChatByUserId = async (req, res, next) => {
  try {
    const text_search = req.body.message;
    const chatListId = req.body.chatlist_id;
    Messages.find({
      "message.text": { $regex: text_search, $options: 'i' }
      , chatlist_id: chatListId
    },
      function (err, result) {
        if (err) { return handleError(err); } else {
          res.json(result);

        }

      }).populate('chatlist_id')
      .populate('sender_id')
      .populate('message_status_id')
      .populate('message_type_id')
      

  } catch (ex) {
    next(ex);
  }
}
// Filter Users Stared Msgs 
module.exports.FilterStaredChatByUserId = async (req, res, next) => {
  try {
    const text_search = req.body.message;
    const UserId = req.body.userId;

    Messages.find({
      "message.text": { $regex: text_search, $options: 'i' }
      ,
      users: {
        $all: [UserId, UserId],

      },
      staredBy:UserId,
      staredStatus:true
    },
      function (err, result) {
        if (err) { return handleError(err); } else {
          res.json(result);
        }

      }).populate('chatlist_id')
      .populate('sender_id')
      .populate('message_status_id')
      .populate('message_type_id')
      

  } catch (ex) {
    next(ex);
  }
}
// filter-chatlist-msgs-by-msg-type
module.exports.FilterChatByMsgType = async (req, res, next) => {
  try {
    const from = req.body.from;
    const to = req.body.to;
    const message_type_id=req.body.message_type_id


    Messages.find({
      users: {
        $all: [from, to],

      },
      message_type_id:message_type_id
    },
      function (err, result) {
        if (err) { return handleError(err); } else {
          res.json(result);
        }

      }).populate('chatlist_id')
      .populate('sender_id')
      .populate('message_status_id')
      .populate('message_type_id')
      

  } catch (ex) {
    next(ex);
  }
}