const router = require("express").Router();
const controller = require("../../Services/chatListServices")

router.get("/get-all", controller.getAllchat_lists)
router.post("/create", controller.createchat_list)
router.get("/get/:chat_listId", controller.getSpecificchat_list)
router.delete("/delete/:chat_listId", controller.deletechat_list)
router.put("/update" , controller.updatechat_list);
router.get("/chat_list_by_userId/:userId" , controller.getchat_list_by_userId);

module.exports = router;