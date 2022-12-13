const router = require("express").Router();
const controller = require("../../Services/activity_statusServices")

router.get("/get-all", controller.getAllactivity_statuss)
router.post("/create", controller.createactivity_status)
router.get("/get/:activity_statusId", controller.getSpecificactivity_status)
router.delete("/delete/:activity_statusId", controller.deleteactivity_status)
router.put("/update" , controller.updateactivity_status);

module.exports = router;