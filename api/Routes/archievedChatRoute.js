const router = require("express").Router();
const controller = require("../../Services/archievedChatServices")

router.get("/get-all", controller.getAllarchievedChats)
router.post("/create", controller.createarchievedChat)
router.get("/get/:archievedChatId", controller.getSpecificarchievedChat)
router.delete("/delete/:archievedChatId", controller.deletearchievedChat)
router.put("/update" , controller.updatearchievedChat);


module.exports = router;