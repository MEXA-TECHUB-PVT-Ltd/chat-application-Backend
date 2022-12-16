const router = require("express").Router();
const controller = require("../../Services/stared_chatServices")

router.get("/get-all", controller.getAllstaredChats)
router.post("/create", controller.createstaredChat)
router.get("/get/:staredChatId", controller.getSpecificstaredChat)
router.delete("/delete/:staredChatId", controller.deletestaredChat)
router.put("/update" , controller.updatestaredChat);

module.exports = router;