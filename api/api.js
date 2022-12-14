const express = require('express');
const router = express.Router();

//Required api's 
// const ImageUpload = require('./Routes/ImageUpload')
const Admin = require('./Routes/Admin')
const User = require('./Routes/userRoutes')
const Messages = require('./Routes//messagesRoutes')
const MessagesStatus = require('./Routes/messageStatusRoute')
const MessagesType = require('./Routes/messageTypeRoute')
const MessagesSubType = require('./Routes/messageSubTypeRoute')
const ChatList = require('./Routes/chatListRoute')
const Activity_Status = require('./Routes/activity_statusRoute')
const replyMessage = require('./Routes/replyMessageRoute')
const PinnedChat = require('./Routes/pinnedChatRoute')
const ArchievedChat = require('./Routes/archievedChatRoute')
const StaredChat = require('./Routes/staredChatRoute')
const Label = require('./Routes/labelRoute')
const LabelChat = require('./Routes/labelChatRoute')















/*********Main Api**********/

// router.use('/Upload', ImageUpload);
router.use('/admin',Admin);
router.use('/user',User);
router.use('/Messages',Messages);
router.use('/MessagesStatus',MessagesStatus);
router.use('/MessagesType',MessagesType);
router.use('/MessagesSubType',MessagesSubType);
router.use('/ChatList',ChatList);
router.use('/Activity_Status',Activity_Status);
router.use('/replyMessage',replyMessage);
router.use('/PinnedChat',PinnedChat);
router.use('/ArchievedChat',ArchievedChat);
router.use('/StaredChat',StaredChat);
router.use('/Label',Label);
router.use('/LabelChat',LabelChat);






























module.exports = router;