const Messages = require("../models/messageModel");
// Get Messages 
module.exports.getMessages = async (req, res, next) => {
    try {
      const { from, to } = req.body;
  
      const messages = await Messages.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
  
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
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



