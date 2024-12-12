const mongoose = require('mongoose')
const dotenv = require('dotenv').config()


const connectDb = async () =>{
    try{
        const connection = await mongoose.connect(process.env.DB_CONNECTION_STR)
        console.log('connected to database')
    }
    catch(error){
        console.log("error:" + error)
    }
}

module.exports = connectDb