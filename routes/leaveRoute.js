const express = require("express")

const router= new express.Router();
const auth = require("../auth/auth");
const leaveModel = require("../models/leaveModel");

//for inserting products

router.post("/product/insert",auth.verifyStudent,function(req,res){
    const title= req.body.title;
    const description= req.body.description;
    const day= req.body.day;
    const startDate= req.body.startDate;
    const studentId= req.studentInfo._id;
    const leaveData = new leaveModel({
        title:title,
        description: description,
        day: day,
        startDate: startDate,
        studentId: studentId,
        leaveData : leaveData,
    })
    leaveData.save().then.catch();
})
