import jwt from "jsonwebtoken";
import { error } from "node:console";
import accessTokenUtil from "../utils/accessTokenUtil.js";

export async function AuthMiddleware(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) {
        return next();
    };

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        await accessTokenUtil.check(token);

        req.user = decodedToken;
        next();

    } catch (error) {
        return res.status(401).json("Invalid token");
    };
}

export function isAuthMiddleware(req, res, next) {

    if (!req.user) {
        return res.status(401).json("Unauthirized")
    };

    next();
};