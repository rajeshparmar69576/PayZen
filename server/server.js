require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connDB = require('./config/db.js')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

// routes
app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.listen(PORT,async()=>{
    console.log(`App is running on http://localhost:${PORT}` )
    await connDB()
})