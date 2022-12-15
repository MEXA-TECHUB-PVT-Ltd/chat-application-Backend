const router = require("express").Router();
const controller = require("../../Services/messageServices")

router.post("/getmsg", controller.getMessages)
router.post("/addmsg", controller.addMessage)
router.post("/starmsg", controller.staredMessages)
router.post("/getStaredMsgsByuserId", controller.getStaredMessagesByUserId)



module.exports = router;