const router = require("express").Router();
const controller = require("../../Services/messageServices")

router.post("/getmsg", controller.getMessages)
router.post("/addmsg", controller.addMessage)

module.exports = router;