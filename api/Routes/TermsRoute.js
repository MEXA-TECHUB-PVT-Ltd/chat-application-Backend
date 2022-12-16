const router = require("express").Router();
const controller = require("../../Services/TermsServices")

router.get("/get-all", controller.getAllTermsAndConditions)
router.post("/create", controller.createTermsAndCondition)
router.get("/get/:TermsAndConditionId", controller.getSpecificTermsAndCondition)
router.delete("/delete/:TermsAndConditionId", controller.deleteTermsAndCondition)
router.put("/update" , controller.updateTermsAndCondition);

module.exports = router;