const router = require("express").Router();
const controller = require("../../Services/labelChatServices")

router.get("/get-all", controller.getAlllabelChats)
router.post("/create", controller.createlabelChat)
router.get("/get/:labelChatId", controller.getSpecificlabelChat)
router.put("/update" , controller.updatelabelChat);
router.get("/getAllLabeledChatByUseId/:user_id", controller.getAllLabeledChatByUseId)


module.exports = router;