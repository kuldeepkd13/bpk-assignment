const express = require("express")
const { connection } = require("./config/db")
const { studentRoute } = require("./routes/student.routes")
const cors = require("cors");


require('dotenv').config();


const app = express()

app.use(express.json())

app.use(cors())

app.use("/Student" , studentRoute)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to Mongodb")
    } catch (error) {
        console.log(error)
        console.log("Not Connected to MongoDb")
    }
    console.log(`server is running at ${process.env.port}`)
})