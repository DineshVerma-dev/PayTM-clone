import { Router } from "express";
import { AccountModel } from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
    const getuserBalance = await AccountModel.findOne({ userId: req.userId });

    if (getuserBalance) {
        return res.json({ balance: getuserBalance.balance });
    } else {
        return res.json({ message: "No balance found" });
    }
})

router.post("/transfer", async (req, res) => {
    const { amount, userId, recipientId } = req.body;
    const debitFromUser = await AccountModel.findOneAndUpdate({ userId }, { $inc: { balance: -amount } }, { new: true });
    const creditToUser = await AccountModel.findOneAndUpdate({ userId: recipientId }, { $inc: { balance: amount } }, { new: true });

    if (debitFromUser && creditToUser) {
        return res.json({ message: "Transfer successful" });
    } else {
        return res.json({ message: "Transfer failed" });
    }
})


export default router