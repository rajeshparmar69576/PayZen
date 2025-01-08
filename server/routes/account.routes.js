const express = require('express')
const mongoose = require('mongoose')
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



router.post('/transfer',AuthMiddleware ,async (req, res) => {
    const session = await mongoose.startSession(); // Start a session
    session.startTransaction(); // Start a transaction

    try {
        const { to, amount } = req.body;

        // Find the sender's account
        const account = await Account.findOne({
            userId: req.userId
        }).session(session);

        if (!account) {
            await session.abortTransaction(); // Rollback transaction
            return res.status(400).json({
                success: false,
                message: "Account not found"
            });
        }

        // Check for sufficient balance
        if (account.balance < amount) {
            await session.abortTransaction(); // Rollback transaction
            return res.status(400).json({
                success: false,
                message: "Insufficient Balance"
            });
        }

        // Find the recipient's account
        const toAccount = await Account.findOne({
            userId: to
        }).session(session);

        if (!toAccount) {
            await session.abortTransaction(); // Rollback transaction
            return res.status(400).json({
                success: false,
                message: "Invalid account"
            });
        }

        // Perform debit from sender
        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } }
        ).session(session);

        // Perform credit to recipient
        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } }
        ).session(session);

        // Commit transaction
        await session.commitTransaction();
        session.endSession(); // End session

        return res.status(200).json({
            success: true,
            message: "Transfer successful"
        });

    } catch (err) {
        await session.abortTransaction(); // Rollback transaction in case of error
        session.endSession(); // End session
        console.error("Error during transfer:", err.message);
        return res.status(500).json({
            success: false,
            error: "Transaction failed: " + err.message
        });
    }
});


module.exports = router