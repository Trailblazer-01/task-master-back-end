const express = require('express')
const cors = require('cors')
const env = require("dotenv").config()
const app = express()
const PORT = process.env.PORT || 8080
const connectDb = require('./db')

const userRoute = require('./routes/user')
const taskRoute = require('./routes/tasks')
const authRoute = require('./routes/auth')

app.use(cors({
    origin: [process.env.FRONTEND], //replace with your domain
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())

connectDb()

app.use((err,req,res,next)=>{
    if(err){
        return res.status(400).json({message:'error: bad request format'})
    }
    next()
})

app.use("/api", authRoute)
app.use("/api", userRoute)
app.use("/api", taskRoute)

app.listen(PORT, ()=>{
    console.log(`app listening at port ${PORT}`)
})
