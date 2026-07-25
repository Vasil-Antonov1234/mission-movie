import jwt from "jsonwebtoken";
import { error } from "node:console";

export function AuthMiddleware(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) {
        return next();
    };

    try {

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    };
}

export function isAuthMiddleware(req, res, next) {

    if (!req.user) {
        return res.status(401).json({ error: "Unauthirized"})
    };

    next();
};