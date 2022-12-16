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











/*********Main Api**********/

// router.use('/Upload', ImageUpload);
router.use('/admin',Admin);
router.use('/user',User);
router.use('/Messages',Messages);
router.use('/MessagesStatus',MessagesStatus);
router.use('/MessagesType',MessagesType);
router.use('/MessagesSubType',MessagesSubType);





















module.exports = router;