import express from "express";
import cors from "cors";
import mainRouter from "./routes/index.js"
const app = express();

app.use(cors())

app.use(express.json());

app.use("/api/v1/users", mainRouter);

// app.get("/", (req, res) => {
//    res.send("hello world")
// })

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

