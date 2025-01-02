require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connDB = require('./config/db.js')
const userRouter = require('./routes/user.routes.js')

const app = express()
const PORT = process.env.PORT || 3000

// middleware
app.use(express.json())
app.use(cors())

// routes
app.use('/api/v1/user',userRouter)


app.listen(PORT,async()=>{
    console.log(`App is running on http://localhost:${PORT}` )
    await connDB()
})