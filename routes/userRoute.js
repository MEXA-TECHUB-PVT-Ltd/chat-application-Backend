const express= require('express');
const router= express.Router();
const controller = require('../controllers/userController')

// router.get("/getStatus" , controller.getStatus);
router.post("/createUser" , controller.createUser);
router.get("/getUsers/:userId" , controller.getUsers);
router.get("/getAllUsers" , controller.getAllUsers);

module.exports=router;