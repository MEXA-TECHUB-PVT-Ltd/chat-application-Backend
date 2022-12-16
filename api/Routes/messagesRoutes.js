const router = require("express").Router();
const controller = require("../../Services/messageServices")

router.post("/getmsg", controller.getMessages)
router.post("/addmsg", controller.addMessage)
router.post("/starmsg", controller.staredMessages)
router.post("/getStaredMsgsByuserId", controller.getStaredMessagesByUserId)
router.post("/UpdateReadDeliveredTimeMessages", controller.ReadTimeAndDeliveredMessages)
router.post("/get-single-msg", controller.getSingleMessage)
router.post("/delete-bulk-of-msgs", controller.DeletBulkOfMsgs)
router.post("/get-all-msgs-by-userId", controller.GetAllMsgsByUserId)
router.post("/filter-all-chat-of-user", controller.FilterAllChatByUserId)
router.post("/filter-single-chatlist-of-user", controller.FilterSingleChatByUserId)
router.post("/filter-stared-chatlist-of-user", controller.FilterStaredChatByUserId)

module.exports = router;