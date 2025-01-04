const express = require('express')
const { Account } = require('../model/account.model.js')
const { AuthMiddleware } = require('../middleware/auth.middleware.js')
const router = express.Router()

router.get('/balance',AuthMiddleware,async(req,res)=>{
    try{
        const userId = req.userId
        const userBalance = await Account.findOne({userId})

        res.status(200).json({
            success:true,
            message:"User balance fetched successfully",
            balance:userBalance.balance
        })
    } catch(err){
        console.error("Error while getting user Balance",err.message)
        res.status(500).json({
            success:false,
            error:err.message
        })
    }
})

module.exports = router