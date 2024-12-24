import express from "express";
import cors from "cors";
import mainRouter from "./routes/index.js"
import accountRouter from "./routes/account.js"
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser())

const corsOptions = {
    origin: 'https://paytome.vercel.app', 
    // origin :"http://localhost:5173/",
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
  };

app.use(cors(corsOptions))

app.use(express.json());

app.use("/api/v1/users", mainRouter);
app.use("/api/v1/account", accountRouter)

app.get("/", (req, res) => {
   res.send("hello world")
})

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

