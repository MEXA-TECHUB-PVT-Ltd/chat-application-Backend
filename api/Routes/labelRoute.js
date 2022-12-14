const router = require("express").Router();
const controller = require("../../Services/labelServices")

router.get("/get-all", controller.getAlllabels)
router.post("/create", controller.createlabel)
router.get("/get/:labelId", controller.getSpecificlabel)
router.delete("/delete/:labelId", controller.deletelabel)
router.put("/update" , controller.updatelabel);

module.exports = router;