const router = require("express").Router();
const controller = require("../../Services/messageTypeServices")

router.get("/get-all", controller.getAllmessageTypes)
router.post("/create", controller.createmessageType)
router.get("/get/:messageTypeId", controller.getSpecificmessageType)
router.delete("/delete/:messageTypeId", controller.deletemessageType)
router.put("/update" , controller.updatemessageType);


module.exports = router;