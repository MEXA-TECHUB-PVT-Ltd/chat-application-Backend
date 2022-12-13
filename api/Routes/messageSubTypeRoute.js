const router = require("express").Router();
const controller = require("../../Services/MessageSubTypeServices")

router.get("/get-all", controller.getAllmessageSubTypes)
router.post("/create", controller.createmessageSubType)
router.get("/get/:messageSubTypeId", controller.getSpecificmessageSubType)
router.delete("/delete/:messageSubTypeId", controller.deletemessageSubType)
router.put("/update" , controller.updatemessageSubType);


module.exports = router;