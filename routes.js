const express = require("express");
const  router = express.Router();
const {getRequest, registrationRequest, getRequest1,loginRequest, updateRequest,deleteRequest,postStudentData} = require('../controllers/controller.js')

router.get("/", getRequest);

router.get("/api/getStudents", getRequest1);

router.post("/api/studentsData", postStudentData)

router.post("/api/login",loginRequest)

router.post("/api/registration", registrationRequest);

router.put("/api/update/:id",updateRequest);

router.delete("/api/delete/:id", deleteRequest);


module.exports = router;