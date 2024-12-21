import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export const jwtmiddleware = (req, res, next) => {
    const gettoken = req.headers.authorization;

    const token = gettoken.split(" ")[1];
    if (!token) {
        return res.status(404).json({ message: "token not found" });
    }

    const decode = jwt.verify(token, JWT_SECRET);
    if (decode) {
        req.userId = decode.userId;
        next();
    }

}