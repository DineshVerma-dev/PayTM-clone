import { Router } from "express";
import z from "zod";
const router = Router();
import { AccountModel, UserModel } from "../db.js";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config.js"
import { jwtmiddleware } from "../middleware.js";

const signupbody = z.object({
    username: z.string().min(3).max(25),
    firstname: z.string().min(3),
    lastname: z.string().min(3),
    password: z.string().min(6)
})


router.post("/signup", async (req, res) => {
    try {

        const { success } = signupbody.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "Invalid input data"
            });
        }

        const existingUser = await UserModel.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(409).json({
                message: "Username already taken"
            });
        }

        const user = await UserModel.create({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        });


        const userId = user._id;

        const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

        await AccountModel.create({
            userId,
            balance: 1 + Math.random() * 1000
        })

        return res.status(201).json({
            message: "User created successfully",
            token: token
        });

    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

const signinbody = z.object({
    username: z.string(),
    password: z.string(),
})

router.post("/signin", async (req, res) => {
    try {

        const { success } = signinbody.safeParse(req.body);
        if (!success) {
            return res.status(400).json({ message: "Invalid username or password" });
        }


        const user = await UserModel.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await user.comparePassword(req.body.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        return res.status(200).json({ token: token, userId: user.id });

    } catch (error) {
        console.error("Error during sign-in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

const updateBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

router.put("/update", jwtmiddleware, async (req, res) => {
    try {

        const { success } = updateBody.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "Invalid input data",

            });
        }


        const updateResult = await UserModel.updateOne({ _id: req.userId }, req.body, { new: true, runValidators: true });



        return res.status(200).json({
            message: "Updated successfully",
            updateResult: updateResult
        });

    } catch (error) {
        console.error("Error during update:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.get("/", jwtmiddleware, async (req, res) => {
    try {
        const filter = req.body.filter || "";
        const users = await UserModel.find({
            $or: [
                { firstname: { "$regex": filter, "$options": "i" } },
                { lastname: { "$regex": filter, "$options": "i" } }
            ],

        })

        return res.status(201).json({
            user: users.map(user => ({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                _id: user._id
            }))
        });
    } catch (error) {
        console.error("Error during getting users :", error);
        return res.status(500).json({
            message: "Error in fetching todo"
        });
    }
})




export default router;