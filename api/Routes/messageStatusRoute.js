const router = require("express").Router();
const controller = require("../../Services/messageStatusServices")

router.get("/get-all", controller.getAllmessageStatuss)
router.post("/create", controller.createmessageStatus)
router.get("/get/:messageStatusId", controller.getSpecificmessageStatus)
router.delete("/delete/:messageStatusId", controller.deletemessageStatus)
router.put("/update" , controller.updatemessageStatus);


module.exports = router;