const router = require("express").Router();
const controller = require("../../Services/chatListServices")

router.get("/get-all", controller.getAllchat_lists)
router.post("/create", controller.createchat_list)
router.get("/get/:chat_listId", controller.getSpecificchat_list)
router.delete("/delete/:chat_listId", controller.deletechat_list)
router.put("/update" , controller.updatechat_list);
router.get("/chat_list_by_userId/:userId" , controller.getchat_list_by_userId);
router.put("/pinned_chat" , controller.updatechat_listPinned);
router.get("/pinned_chatList_by_userId/:userId" , controller.get_pinnedchat_list_by_userId);
router.put("/UnPinned_chat" , controller.updatechat_listUnPinned);
// Block 
router.put("/block_chat" , controller.updatechat_listBlocked);
router.get("/blocked_chatList_by_userId/:userId" , controller.get_blockedchat_list_by_userId);
router.put("/UnBlock_chat" , controller.updatechat_listUnBlock);

module.exports = router;