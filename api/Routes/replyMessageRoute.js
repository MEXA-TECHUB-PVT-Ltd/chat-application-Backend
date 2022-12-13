const router = require("express").Router();
const controller = require("../../Services/replyMessageServices")

router.get("/get-all", controller.getAllreplyMessages)
router.post("/create", controller.createreplyMessage)
router.get("/get/:replyMessageId", controller.getSpecificreplyMessage)
router.delete("/delete/:replyMessageId", controller.deletereplyMessage)
router.put("/update" , controller.updatereplyMessage);


module.exports = router;