const mongoose = require("mongoose")


const studentSchema = mongoose.Schema({
   firstName : String,
   lastName : String,
   studentId : String,
   dob : Date,
   gender: String,
   address: String

},{
    versionKey:false
})

const StudentModel = mongoose.model("Student" , studentSchema)

module.exports={StudentModel}