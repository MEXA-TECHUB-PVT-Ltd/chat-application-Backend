const Messages = require("../models/messageModel");
// Get Messages 
module.exports.getMessages = async (req, res, next) => {
    try {
      const { from, to } = req.body;
  
      const messages = await Messages.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 }).populate('message_status_id').populate('message_type_id').populate('message_subtype_id')
  
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender_id === from,
          message: msg.message.text,
          message_status_id:msg.message_status_id.name,

          message_type_name:msg.message_type_id.name,
          message_type_one_type:msg.message_type_id.is_one_time,

          message_subtype_name:msg.message_subtype_id.name,
          message_subtype_thumbnail:msg.message_subtype_id.thumbnail,

          is_deleted:msg.is_deleted,
          createdAt:msg.createdAt,
          deleted_at:msg.deleted_at
        };
      });
      res.json(projectedMessages);
    } catch (ex) {
      next(ex);
    }
  };
  
  module.exports.addMessage = async (req, res, next) => {
    try {
      const { from, to, message,chatlist_id,message_status_id ,message_type_id,message_subtype_id,created_at,updated_at,deleted_at,is_deleted} = req.body;
      const data = await Messages.create({
        message: { text: message },
        users: [from, to],
        chatlist_id:chatlist_id,
        sender_id: from,
        message_status_id:message_status_id,
        message_type_id:message_type_id,
        message_subtype_id:message_subtype_id,
        created_at:created_at,
        updated_at:updated_at,
        deleted_at:deleted_at,
        is_deleted:is_deleted

      });
  
    //   if (data) return res.json({ msg: "Message added successfully." });
      if (data) return res.json({ data: data ,message:"Message Added successfully"});

      else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
      next(ex);
    }
  }



