const mongoose = require('mongoose')


const connDB = async() => {
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('Db connected Sucessfully...'))
    .catch((err)=> {
        console.error("Error while connecting DB",err)
        process.exit(1)
    })
}

module.exports = connDB