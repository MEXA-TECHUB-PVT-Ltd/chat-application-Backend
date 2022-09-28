
const express= require('express');
const router= express.Router();
const controller = require('../controllers/StatusController')

// router.get("/getStatus" , controller.getStatus);
router.post("/createStatus" , controller.createStatus);
router.get("/getStatusById/:statusId" , controller.getStatusById);

module.exports=router;