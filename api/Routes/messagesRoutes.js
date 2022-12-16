const router = require("express").Router();
const controller = require("../../Services/messageServices")

router.post("/getmsg", controller.getMessages)
router.post("/addmsg", controller.addMessage)
router.post("/starmsg", controller.staredMessages)
router.post("/getStaredMsgsByuserId", controller.getStaredMessagesByUserId)
router.post("/UpdateReadDeliveredTimeMessages", controller.ReadTimeAndDeliveredMessages)
router.post("/get-single-msg", controller.getSingleMessage)
router.post("/delete-bulk-of-msgs", controller.DeletBulkOfMsgs)

module.exports = router;