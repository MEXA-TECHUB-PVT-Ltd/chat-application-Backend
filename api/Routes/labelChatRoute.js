const router = require("express").Router();
const controller = require("../../Services/labelChatServices")

router.get("/get-all", controller.getAlllabelChats)
router.post("/create", controller.createlabelChat)
router.get("/get/:labelChatId", controller.getSpecificlabelChat)
router.delete("/delete/:labelChatId", controller.deletelabelChat)
router.put("/update" , controller.updatelabelChat);

module.exports = router;