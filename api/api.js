const express = require('express');
const router = express.Router();

//Required api's 
// const ImageUpload = require('./Routes/ImageUpload')
const Admin = require('./Routes/Admin')
const User = require('./Routes/userRoutes')
const Messages = require('./Routes//messagesRoutes')
const MessagesStatus = require('./Routes/messageStatusRoute')
const MessagesType = require('./Routes/messageTypeRoute')
const ChatList = require('./Routes/chatListRoute')
const Activity_Status = require('./Routes/activity_statusRoute')
const replyMessage = require('./Routes/replyMessageRoute')
const StaredChat = require('./Routes/staredChatRoute')
const Label = require('./Routes/labelRoute')
const LabelChat = require('./Routes/labelChatRoute')
const Terms = require('./Routes/TermsRoute')


/*********Main Api**********/

// router.use('/Upload', ImageUpload);
router.use('/admin',Admin);
router.use('/user',User);
router.use('/Messages',Messages);
router.use('/MessagesStatus',MessagesStatus);
router.use('/MessagesType',MessagesType);
router.use('/ChatList',ChatList);
router.use('/Activity_Status',Activity_Status);
router.use('/replyMessage',replyMessage);
router.use('/StaredChat',StaredChat);
router.use('/Label',Label);
router.use('/LabelChat',LabelChat);
router.use('/Terms',Terms);































module.exports = router;