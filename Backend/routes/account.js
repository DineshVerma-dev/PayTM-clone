import { Router } from "express";
import { AccountModel } from "../db.js";
import { jwtmiddleware } from "../middleware.js";
import mongoose from "mongoose";

const router = Router();

router.get("/check", jwtmiddleware, async (req, res) => {
    const getuserBalance = await AccountModel.findOne({ userId: req.userId });

    if (getuserBalance) {
        return res.json({ balance: getuserBalance.balance });
    } else {
        return res.json({ message: "No balance found" });
    }
})

router.post("/transfer", jwtmiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, to } = req.body;
    //console.log(session)
    const account = await AccountModel.findOne({ userId: req.userId }).session(session);
    console.log("Sender's userId:", req.userId);
    console.log("sender account : ", account)
    if (!account || account.balance < amount) {
        await session.abortTransaction();
        res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toaccount = await AccountModel.findOne({ userId: to }).session(session);
    console.log("receiver : ", toaccount)
    if (!toaccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await AccountModel.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await AccountModel.updateOne({ userId: to }, { $inc: { balance: +amount } }).session(session);

    await session.commitTransaction();
    return res.json({ message: "Transaction Successful" })
})


export default router