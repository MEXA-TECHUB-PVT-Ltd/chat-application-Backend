const router = require("express").Router();
const controller = require("../../Services/pinnedChatServices")

router.get("/get-all", controller.getAllpinnedChats)
router.post("/create", controller.createpinnedChat)
router.get("/get/:pinnedChatId", controller.getSpecificpinnedChat)
router.delete("/delete/:pinnedChatId", controller.deletepinnedChat)
router.put("/update" , controller.updatepinnedChat);


module.exports = router;