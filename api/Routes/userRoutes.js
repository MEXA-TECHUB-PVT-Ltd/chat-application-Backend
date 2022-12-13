const router = require("express").Router();
const controller= require("../../Services/userServices")

router.get("/get-all" ,controller.getAllusers)
router.get("/get/:userId" ,controller.getSpecificuser)

// router.get("/get-admin-by-ID/:adminId" , controller.getSpecificadmin)
router.delete("/delete/:userId" , controller.deleteuser);
router.post("/create" , controller.createuser);
router.post("/otpSms" , controller.otpTwilio);

router.put("/update-user" , controller.updateuser);
router.put("/logout" , controller.logoutuser);
router.put("/login" , controller.loginuser);
// router.post("/forget-password" , controller.forgetPasswordAdmin);

module.exports = router;