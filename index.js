const express= require('express')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8082
const authRoutes = require('./src/routes/authRoutes')
const chatRoutes = require('./src/routes/chatRoutes')
app.use("/api/auth",authRoutes)
app.use("/api/chat",chatRoutes)

mongoose
    .connect(process.env.DB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> {app.listen(PORT,()=>{
        console.log("listening and connected to DB")
    })})
    .catch((e)=> console.log(e))