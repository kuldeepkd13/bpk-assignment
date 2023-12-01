const express = require("express");
const { StudentModel } = require("../models/student.models");

const studentRoute = express.Router();

studentRoute.post("/add",async(req,res)=>{
try {
    const {firstName , lastName , studentId , dob , gender , address} = req.body

    const student  = await StudentModel.findOne({studentId});

    if (student){
        return res.status(400).send({"message":"Student with this studentId Present"})
    }
    
    const newStudent = new StudentModel({firstName , lastName , studentId , dob , gender , address})
    await newStudent.save()
    res.status(200).send({"message":"New Student Added",newStudent})
} catch (error) {
    res.status(400).send({message:error.message})
}
})

studentRoute.get("/allStudent",async(req,res)=>{
    try {
        const students = await StudentModel.find();
        res.status(200).send({"message":"All the Student data",students})
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

studentRoute.get("/:studentId",async(req,res)=>{
    try {
        const {studentId} = req.params
        const student  = await StudentModel.findOne({_id:studentId});
        if (!student){
            return res.status(400).send({"message":"Student with this id Not Present"})
        }
        res.status(200).send({"message":"Student data",student})
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

studentRoute.put("/update/:Id", async (req, res) => {
    try {
      const updatedStudentData = req.body;
      const { Id } = req.params;
      
      const students = await StudentModel.find({ _id : Id });
   
      if (students.length===0) {
        return res.status(400).send({ message: "No student found" });
      }
      else {

          const updatedStudent = await StudentModel.findByIdAndUpdate(
            Id,
            updatedStudentData,
            { new: true }
          );
      
          res.status(200).send({ message: "Student updated", updatedStudent });
      }
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });
  
  studentRoute.delete("/delete/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const students = await StudentModel.find({ _id : id });
  
      if (students.length === 0) {
        return res.status(400).send({ message: "No student found" });
      }
  
      const deleteStudent = await StudentModel.findByIdAndDelete({ _id : id });
  
      res.status(200).send({ message: "Student data deleted" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });
  


module.exports={studentRoute}